<template>
  <div
    class="bar"
    :class="{'is-opaque': isOpaque, 'is-dark': isDark, 'is-alert': alertsForHour.length > 0}"
    @click="handleBarClick"
  >
    <div
      class="bar__color"
      :style="{ background: colorForTemperature(hour.temperature), height: height }"
    >
      <span class="font-bold">{{round(hour.temperature)}}°</span>
      <div class="bar__wind">
        <span
          class="font-s bar__arrow"
          :style="{display: 'block', lineHeight: 1, transform: `rotate(${hour.windBearing + 90}deg)`}"
        >➤</span>
        <div class="wind-text">
          <span>{{round(hour.windSpeed)}}</span>
          <span>{{humanBearing(hour.windBearing).short}}</span>
        </div>
      </div>
    </div>
    <span class="mini-details">
      <span>{{barTime}}</span>
      <div
        v-show="activeBarIndex === null"
        :style="{
          height: activeBarIndex === null ? '80px' : 0
        }"
      >
        <div
          class="possible-rain"
          :style="{background: hour.precipProbability >= 0.2 ? '#53d7dd' : 'transparent', height: mapInputToRange(hour.precipProbability, [0, 1], [60, 80]) + 'px'}"
        >
          <div class="alert-icon" v-if="alertsForHour.length > 0">&#9888;</div>
          <Icon :icon="hour.icon" :dark="isDark" />
          <div class="rain-percent-mm">
            <span
              class="font-xs"
              v-if="hour.precipProbability >= 0.2"
            >{{round(hour.precipProbability * 100)}}%</span>
            <span class="font-xs">{{mmPerHour}}</span>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Icon from "~/components/Icon";

export default {
  props: ["index"],
  components: {
    Icon
  },
  computed: {
    ...mapState(["hours", "activeBarIndex"]),
    ...mapGetters([
      "barHeightsForHours",
      "sunriseToday",
      "sunsetToday",
      "sunriseTomorrow",
      "sunsetTomorrow",
      "cleanedAlerts",
    ]),
    mmPerHour() {
      return `${this.toFixed1(this.hour.precipIntensity)}mm`;
    },
    hour() {
      return this.hours[this.index];
    },
    alertsForHour() {
      return this.cleanedAlerts ? this.cleanedAlerts.filter(a => {
        return this.isInRange(this.hour.time, [a.time, a.expires])
      }) : [];
    },
    milliseconds() {
      return Number(`${this.hour.time}000`);
    },
    height() {
      return `${this.barHeightsForHours[this.index]}px`;
    },
    isOpaque() {
      return this.activeBarIndex === null || this.index === this.activeBarIndex;
    },
    isDark() {
      const endSunriseToday = this.getStartEndHourForTime(this.sunriseToday)[1];
      const startSunsetToday = this.getStartEndHourForTime(this.sunsetToday)[0];
      const endSunriseTomorrow = this.getStartEndHourForTime(
        this.sunriseTomorrow
      )[1];
      const startSunsetTomorrow = this.getStartEndHourForTime(
        this.sunsetTomorrow
      )[0];
      const t = this.milliseconds;

      return (
        t <= endSunriseToday ||
        (t >= startSunsetToday && t < endSunriseTomorrow) ||
        t >= startSunsetTomorrow
      );
    },
    barTime() {
      if (
        this.isInRange(
          this.milliseconds,
          this.getStartEndHourForTime(this.sunriseToday)
        )
      ) {
        return `${this.formatTime(this.sunriseToday, true)}`;
      }

      if (
        this.isInRange(
          this.milliseconds,
          this.getStartEndHourForTime(this.sunsetToday)
        )
      ) {
        return `${this.formatTime(this.sunsetToday, true)}`;
      }

      if (
        this.isInRange(
          this.milliseconds,
          this.getStartEndHourForTime(this.sunriseTomorrow)
        )
      ) {
        return `${this.formatTime(this.sunriseTomorrow, true)}`;
      }

      if (
        this.isInRange(
          this.milliseconds,
          this.getStartEndHourForTime(this.sunsetTomorrow)
        )
      ) {
        return `${this.formatTime(this.sunsetTomorrow, true)}`;
      }

      return this.formatTime(this.hour.time);
    }
  },
  methods: {
    getStartEndHourForTime(timeInSeconds) {
      const milliseconds = Number(`${timeInSeconds}000`);
      const date = new Date(milliseconds);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hour = date.getHours();
      const startHour = new Date(year, month, day, hour, 0).getTime();
      const endHour = new Date(year, month, day, hour, 59).getTime();

      return [startHour, endHour];
    },
    isInRange(value, [start, end]) {
      return value >= start && value <= end;
    },
    handleBarClick() {
      const isActive = this.index === this.activeBarIndex;

      this.setActiveBarIndex(isActive ? null : this.index);
      isActive && this.setActiveAlerts([]);
    },
    ...mapMutations(["setActiveBarIndex", "setActiveAlerts"])
  },
  beforeUpdate() {
    const isActive = this.index === this.activeBarIndex;

    isActive && this.setActiveAlerts(this.alertsForHour);
  }
};
</script>

<style lang="scss">
.rain-percent-mm {
  display: flex;
  flex-direction: column;
}

.mini-details {
  margin: 3px 0 0;
  left: 0;
  right: 0;
  font-size: 10px;
}

.bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transition: background-color 500ms ease;
  opacity: 0.5;

  &.is-opaque {
    opacity: 1;
  }
}

.bar__color {
  color: white;
  border-radius: 6px;
  padding: 2px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.bar__arrow {
  position: absolute;
  bottom: 15px;
  left: 50%;
  margin-left: -5px;
}

.bar__wind {
  font-weight: bold;
}

.font-xs {
  font-size: 0.8em;
}

.possible-rain {
  padding-top: 3px;
  margin-top: 5px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  color: white;
  font-weight: bold;
  font-size: 12px;
  position: relative;
}

.alert-icon {
  position: absolute;
    top: -4px;
    left: 2px;
    color: black;
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: #ffce3c;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wind-text {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 12px;
}
</style>

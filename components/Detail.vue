<template>
  <div class="full-width detail" :style="{background: colorForActiveHour}">
    <p class="detail__summary">{{hour.summary}}</p>
    <div class="detail__inner">
      <div class="detail__left">
        <ul>
          <li>
            <span class="detail__key">Temperature</span>
            <span class="detail__value">{{round(hour.temperature)}}°</span>
          </li>
          <li>
            <span class="detail__key">Feels like</span>
            <span class="detail__value">{{round(hour.apparentTemperature)}}°</span>
          </li>
          <li>
            <span class="detail__key">Dew point</span>
            <span class="detail__value">{{round(hour.dewPoint)}}°</span>
          </li>
          <li>
            <span class="detail__key">Humidity</span>
            <span class="detail__value">{{round(hour.humidity * 100)}}%</span>
          </li>
        </ul>
      </div>
      <div class="detail__right">
        <ul>
          <li>
            <span class="detail__key">Rain</span>
            <span
              class="detail__value"
            >{{round(hour.precipProbability * 100)}}% &bull; {{toFixed1(hour.precipIntensity)}}mm</span>
          </li>
          <li>
            <span class="detail__key">Wind</span>
            <span class="detail__value">{{hourWind}} {{humanBearing(hour.windBearing).short}}</span>
          </li>
          <li>
            <span class="detail__key">UV index</span>
            <span class="detail__value">{{hour.uvIndex}}</span>
          </li>
          <li>
            <span class="detail__key">Cloud cover</span>
            <span class="detail__value">{{round(hour.cloudCover * 100)}}%</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["colorForActiveHour"]),
    ...mapState(["hours", "activeBarIndex"]),
    hour() {
      return this.hours[this.activeBarIndex];
    },
    hourWind() {
      const speed = this.round(this.hour.windSpeed);
      const gust = this.round(this.hour.windGust);

      return gust > speed ? `${speed}–${gust}mph` : `${speed}mph`;
    }
  }
};
</script>

<style lang="scss">
.detail__summary {
  margin-bottom: 2px;
  text-transform: uppercase;
  font-weight: bold;
}

.detail {
  margin-top: 3px;
  height: 82px;
  padding: 4px 6px;
  color: white;
  border-radius: 6px;
  font-size: 10px;

  ul {
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding-bottom: 2px;
  }
}

.detail__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.detail__key {
  text-transform: uppercase;
}

.detail__value {
  font-weight: bold;
}
</style>

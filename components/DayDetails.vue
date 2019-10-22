<template>
  <li class="day-details-row grid align-center">
    <div class="flex align-center">
      <Icon :icon="day.icon" :dark="false"/>
    </div>
    <div class="flex align-stretch">
      <DayDate :time="day.time"/>
    </div>
    <div class="flex align-stretch">
      <p
        class="font-s white-space-normal pad-4"
      >{{day.summary}} {{toFixed1(day.precipIntensity * 24)}}mm. {{dayWind}} {{humanBearing(day.windBearing).long}}. UV {{day.uvIndex}}.</p>
    </div>
  </li>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import DayDate from "~/components/DayDate";
import Icon from "~/components/Icon";

export default {
  components: { DayDate, Icon },
  props: ["index"],
  computed: {
    ...mapState(["daily"]),
    ...mapGetters(["dailyHighRange"]),
    day() {
      return this.daily.data[this.index];
    },
    dayWind() {
      const speed = this.round(this.day.windSpeed);
      const gust = this.round(this.day.windGust);

      return gust > speed ? `${speed}–${gust}mph` : `${speed}mph`;
    }
  }
};
</script>

<style>
.day-details-row {
  grid-template-columns: 50px 50px 1fr;
}

.white-space-normal {
  white-space: normal;
}

.pad-4 {
  padding: 4px 0;
}
</style>

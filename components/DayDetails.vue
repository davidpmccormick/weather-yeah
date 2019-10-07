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
      >{{day.summary}} {{round(day.precipIntensity * 24)}}mm. {{round(day.windSpeed)}}mph {{humanBearing(day.windBearing).long}}. Gusts of {{round(day.windGust)}}mph. UV index {{day.uvIndex}}.</p>
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

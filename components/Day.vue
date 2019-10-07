<template>
  <li class="row grid">
    <div class="flex justify-end align-stretch">
      <div class="flex align-stetch justify-between">
        <span
          class="rain pad flex align-center font-white font-bold font-xs"
          :style="{
            width: `${mapInputToRange(round(day.precipProbability * 100), [0, 100], [10, 25])}vw`,
            background:
              day.precipProbability >= 0.2
                ? '#53d7dd'
                : 'transparent'
          }"
        >
          <span v-if="day.precipProbability >= 0.2" class="rain-percent-mm">
            <span>{{ round(day.precipProbability * 100) }}%</span>
            <span class="font-xs">{{round(day.precipIntensity * 24)}}mm</span>
          </span>
        </span>
        <span
          class="flex align-center icon-container"
          :style="{
              background:
                day.precipProbability >= 0.2
                  ? '#53d7dd'
                  : 'transparent'
            }"
        >
          <Icon :icon="day.icon" :dark="false"/>
        </span>
      </div>
    </div>
    <div class="flex align-stretch justify-center">
      <DayDate :time="day.time"/>
    </div>
    <div class="flex align-stretch">
      <div class="temperature flex align-stetch">
        <span
          class="low pad flex align-center justify-center font-white font-bold"
          :style="{ background: colorForTemperature(day.temperatureLow) }"
        >
          <span>{{ round(day.temperatureLow) }}°</span>
        </span>
        <span
          class="high pad flex align-center justify-end font-white font-bold"
          :style="{
            background: colorForTemperature(day.temperatureHigh),
            width: `${mapInputToRange(
              day.temperatureHigh,
              dailyHighRange,
              [10, 25]
            )}vw`
          }"
        >
          <span>{{ round(day.temperatureHigh) }}°</span>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Icon from "~/components/Icon";
import DayDate from "~/components/DayDate";

export default {
  components: { Icon, DayDate },
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
.rain-percent-mm {
  display: flex;
  flex-direction: column;
}
</style>

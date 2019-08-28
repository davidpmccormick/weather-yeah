<template>
  <div>
    <div class="pad-row">
      <h2>This week</h2>
      <p>{{ daily.summary }}</p>
    </div>
    <div>
      <ul class="no-padding">
        <li class="row grid" v-for="day in daily.data" :key="day.time">
          <div class="flex justify-end align-stretch">
            <div class="flex align-stetch justify-between">
              <span
                class="rain pad flex align-center font-white font-bold"
                :style="{
                  width: `${mapInputToRange(round(day.precipProbability * 100), [0, 100], [10, 25])}vw`,
                  background:
                    round(day.precipProbability * 100) > 10
                      ? '#53d7dd'
                      : 'transparent'
                }"
              >
                <span>{{ round(day.precipProbability * 100) }}%</span>
              </span>
              <span
                class="icon flex align-center justify-center"
                :style="{
                  background:
                    round(day.precipProbability * 100) > 10
                      ? '#53d7dd'
                      : 'transparent'
                }"
              >
                <span class="icon-bg flex">
                  <img src="https://image.flaticon.com/icons/png/128/439/439842.png">
                </span>
              </span>
            </div>
          </div>
          <div class="flex align-stretch justify-center">
            <div class="date grid uppercase font-s">
              <span class="day pad-t">{{ formatDay(day.time) }}</span>
              <span class="number pad-b font-grey">{{ formatDate(day.time) }}</span>
            </div>
          </div>
          <div class="flex align-stretch">
            <div class="temperature flex align-stetch">
              <span
                class="low pad flex align-center justify-center font-white font-bold"
                :style="{ background: colorForTemperature(day.temperatureLow) }"
              >
                <span>{{ round(day.temperatureLow) }}º</span>
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
                <span>{{ round(day.temperatureHigh) }}º</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["daily"]),
    ...mapGetters(["dailyHighRange"])
  }
};
</script>

<style lang="scss">
.row {
  width: 100vw;
  margin: 0 auto;
  grid-template-columns: 1fr 50px 1fr;
  grid-gap: 5px;
  margin-bottom: 3px;
  height: 46px;
}

.low {
  width: 46px;
  margin-right: 3px;
}

.icon {
  width: 35px;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.icon-bg {
  background: rgba(#26a7f5, 0.1);
  border-radius: 9999px;
  padding: 3px;
}

.date {
  text-align: center;
}

.uppercase {
  text-transform: uppercase;
}

.pad {
  padding: 5px;
}

.pad-l {
  padding-left: 5px;
}

.pad-r {
  padding-right: 5px;
}

.pad-t {
  padding-top: 5px;
}

.pad-b {
  padding-bottom: 5px;
}

.rain {
  border-radius: 6px 0 0 6px;
}

.high {
  border-radius: 0 6px 6px 0;
}

.font-grey {
  color: grey;
}

.font-bold {
  font-weight: bold;
}

.font-s {
  font-size: 12px;
}

.font-white {
  color: white;
}
</style>

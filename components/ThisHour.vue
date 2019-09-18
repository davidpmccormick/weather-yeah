<template>
  <div v-if="shouldShowThisHour">
    <div class="grid grid-12 grid-gap grid-end rain-bars">
      <div class="downpour">
        <div class="flex">
          <span class="dash"></span>
          <span class="rain-word">DOWNPOUR</span>
          <span class="dash"></span>
        </div>
      </div>
      <div class="steady">
        <div class="flex">
          <span class="dash"></span>
          <span class="rain-word">STEADY</span>
          <span class="dash"></span>
        </div>
      </div>
      <div class="drizzle">
        <div class="flex">
          <span class="dash"></span>
          <span class="rain-word">DRIZZLE</span>
          <span class="dash"></span>
        </div>
      </div>
      <div
        class="rain-bar"
        v-for="fiveMinutes in fiveMinutely"
        :style="{height: rainBarHeight(fiveMinutes.intensity), opacity: fiveMinutes.probability}"
        :key="fiveMinutes.interval"
      ></div>
    </div>
    <div class="flex flex--between font-s" style="margin-top: 5px;">
      <span>Now</span>
      <span>15mins</span>
      <span>30mins</span>
      <span>45mins</span>
      <span>60mins</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mapInputToRange from "~/utils/map-input-to-range";

export default {
  computed: {
    ...mapGetters(["shouldShowThisHour", "fiveMinutely"])
  },
  methods: {
    rainBarHeight(intensity) {
      const fifteenToOneHundred = intensity * 6.66;
      const input = fifteenToOneHundred >= 100 ? 100 : fifteenToOneHundred;

      return `${mapInputToRange(input, [0, 100], [10, 100])}px`;
    }
  }
};
</script>

<style lang="scss">
.rain-bars {
  height: 100px;
  position: relative;
  border-bottom: 1px solid #ddd;
}

.downpour,
.steady,
.drizzle {
  position: absolute;
  left: 0;
  right: 0;
  font-size: 0.6em;
  color: #aaa;
}

.downpour {
  bottom: 80px;
}

.steady {
  bottom: 50px;
}

.drizzle {
  bottom: 20px;
}
.rain-bar {
  background: #53d7dd;
  border-radius: 6px 6px 0 0;
}

.dash {
  position: relative;
  flex: 1;
  border-top: 1px dashed #ddd;
  transform: translateY(50%);
}

.rain-word {
  padding: 0 6px;
  letter-spacing: 0.05em;
}

.flex--between {
  justify-content: space-between;
}
</style>

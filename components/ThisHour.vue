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
        :style="{height: rainBarHeight(fiveMinutes.intensity), opacity: fiveMinutes.probability, animationDuration: (Math.random() * 500) + 1500 + 'ms'}"
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
import { mapState, mapGetters } from "vuex";
import mapInputToRange from "~/utils/map-input-to-range";

export default {
  computed: {
    ...mapState(["minutely"]),
    ...mapGetters(["shouldShowThisHour", "fiveMinutely"])
  },
  methods: {
    rainBarHeight(intensity) {
      const fifteenToOneHundred = intensity * 25;
      const input = fifteenToOneHundred >= 100 ? 100 : fifteenToOneHundred;

      return `${mapInputToRange(input, [0, 100], [10, 100])}px`;
    }
  }
};
</script>

<style lang="scss">
.rain-bars {
  height: 80px;
  position: relative;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}

.downpour,
.steady,
.drizzle {
  position: absolute;
  left: 0;
  right: 0;
  font-size: 0.6em;
  color: #ccc;
}

.downpour {
  bottom: 80%;
}

.steady {
  bottom: 50%;
}

.drizzle {
  bottom: 20%;
}
.rain-bar {
  background: #53d7dd;
  border-radius: 6px 6px 0 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    animation: wibble ease infinite;
    animation-duration: inherit;
    left: 0;
    right: 0;
    height: 20px;
    border-radius: 6px 6px 0 0;
    background: inherit;
  }
}

.dash {
  position: relative;
  flex: 1;
  border-top: 1px dashed #ccc;
  transform: translateY(50%);
  z-index: 1;
}

.rain-word {
  padding: 0 6px;
  letter-spacing: 0.05em;
  z-index: 1;
}

.flex--between {
  justify-content: space-between;
}

@keyframes wibble {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-2px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>

<template>
  <div
    class="bar"
    :class="{'is-active': isActive}"
    :style="{ background: colorForTemperature(hour.temperature), height: height }"
    @click="scrollDetails(index)"
  >
    <div>
      <span class="font-bold">{{round(hour.temperature)}}º</span>
      <span class="time">{{formatTime(hour.time)}}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  props: ["index"],
  computed: {
    ...mapState(["hours", "isScrolling"]),
    ...mapGetters(["activeBarIndex", "barHeightsForHours"]),
    hour() {
      return this.hours[this.index];
    },
    height() {
      return `${this.barHeightsForHours[this.index]}px`;
    },
    isActive() {
      return this.index === this.activeBarIndex;
    }
  },
  methods: {
    ...mapActions(["scrollDetails"])
  }
};
</script>

<style lang="scss">
.time {
  display: block;
  font-size: 0.5em;
}
.bar {
  padding-top: 10px;
  text-align: center;
  color: white;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 6px 6px 0 0;
  transition: background-color 500ms ease;
  opacity: 0.8;
  border-bottom: 3px solid white;

  &.is-active {
    opacity: 1;
    border-bottom-color: transparent;
  }
}
</style>

<template>
  <div>
    <h2>Right now</h2>
    <div class="right-now-scroller-wrapper" :style="{height: height ? `${height}px` : 'auto'}">
      <div
        ref="right-now-scroller"
        class="overflow-x-auto grid grid-100-100 grid-gap snap-scroll nowrap"
      >
        <div class="full-width">
          <BigDetails ref="big-details"/>
        </div>
        <div class="full-width">
          <CurrentBreakdown ref="current-breakdown"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BigDetails from "~/components/BigDetails";
import CurrentBreakdown from "~/components/CurrentBreakdown";

export default {
  mounted() {
    const rightNowScrollerEl = this.$refs["right-now-scroller"];
    const bigDetailsEl = this.$refs["big-details"].$el;
    const currentBreakdownEl = this.$refs["current-breakdown"].$el;

    const bigDetailsHeight = bigDetailsEl.getBoundingClientRect().height;
    const currentBreakdownHeight = currentBreakdownEl.getBoundingClientRect()
      .height;

    this.height = bigDetailsHeight;

    this.updateHeight = () => {
      // TODO: throttle this
      // TODO: removeEventListener in willUnmount();
      const isBigDetails =
        currentBreakdownEl.getBoundingClientRect().left >= 200;

      this.height = isBigDetails ? bigDetailsHeight : currentBreakdownHeight;
    };

    rightNowScrollerEl.addEventListener("scroll", this.updateHeight);
  },
  data() {
    return {
      height: null
    };
  },
  computed: {
    ...mapGetters(["shouldShowThisHour"])
  },
  components: {
    BigDetails,
    CurrentBreakdown
  }
};
</script>

<style>
.right-now-scroller-wrapper {
  overflow: hidden;
  transition: height 400ms ease;
}
</style>
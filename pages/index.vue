<template>
  <div>
    <RightNow/>
    <!-- <Alerts/> -->
    <!-- <ThisHour/> -->
    <NextLittleWhile/>
    <ThisWeek/>
    <PoweredBy/>
  </div>
</template>

<script>
import RightNow from "~/components/RightNow";
import ThisHour from "~/components/ThisHour";
import NextLittleWhile from "~/components/NextLittleWhile";
import Alerts from "~/components/Alerts";
import ThisWeek from "~/components/ThisWeek";
import PoweredBy from "~/components/PoweredBy";

import { mapMutations } from "vuex";

export default {
  async asyncData({ env, $axios, store }) {
    const { darkSkyKey, darkSkyBaseUrl, digbyLatLng } = env;
    const {
      data: { minutely, hourly, daily, alerts, currently }
    } = await $axios.get(
      `${darkSkyBaseUrl}/${darkSkyKey}/${digbyLatLng}?units=uk2`
    );

    store.commit("setCurrently", currently);
    store.commit("setHours", hourly.data.slice(1, 17));
    store.commit("setHourlySummary", hourly.summary);
    store.commit("setMinutely", minutely);
    store.commit("setAlerts", alerts);
    store.commit("setDaily", daily);
  },
  mounted() {
    window.addEventListener("resize", this.updatePageWidth);
    this.updatePageWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updatePageWidth);
  },
  components: {
    NextLittleWhile,
    RightNow,
    ThisHour,
    Alerts,
    ThisWeek,
    PoweredBy
  },
  methods: {
    ...mapMutations(["setPageWidth"]),
    updatePageWidth() {
      this.setPageWidth(this.$el.clientWidth);
    }
  }
};
</script>

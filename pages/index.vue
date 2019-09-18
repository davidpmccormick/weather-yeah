<template>
  <div class="pad-row spaced">
    <RightNow/>
    <!-- <Alerts/> -->
    <ThisHour/>
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

export default {
  async asyncData({ env, $axios, store }) {
    const { darkSkyKey, darkSkyBaseUrl, digbyLatLng } = env;
    const {
      data: { minutely, hourly, daily, alerts, currently }
    } = await $axios.get(
      `${darkSkyBaseUrl}/${darkSkyKey}/${digbyLatLng}?units=uk2`
    );

    store.commit("setCurrently", currently);
    store.commit("setHours", hourly.data.slice(1, 25));
    store.commit("setHourlySummary", hourly.summary);
    store.commit("setMinutely", minutely);
    store.commit("setAlerts", alerts);
    store.commit("setDaily", daily);
  },

  components: {
    NextLittleWhile,
    RightNow,
    ThisHour,
    Alerts,
    ThisWeek,
    PoweredBy
  }
};
</script>

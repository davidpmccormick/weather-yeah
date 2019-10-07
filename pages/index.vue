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
  async asyncData({ store, $axios }) {
    await store.dispatch("getWeatherData");
  },
  mounted() {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.$store.commit("setLatitude", latitude);
        this.$store.commit("setLongitude", longitude);
        this.$store.dispatch("getWeatherData");
      }
    );
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

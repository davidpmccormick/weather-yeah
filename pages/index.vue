<template>
  <div>
    <ActiveAlerts/>
    <Locations/>
    <div
      class="pad-row spaced main"
      :class="{'is-locations-active': isLocationsActive, 'is-updating': isUpdating}"
    >
      <Location/>
      <RightNow/>
      <Alerts/>
      <ThisHour/>
      <NextLittleWhile/>
      <ThisWeek/>
      <PoweredBy/>
    </div>
  </div>
</template>

<script>
import ActiveAlerts from "~/components/ActiveAlerts";
import Locations from "~/components/Locations";
import Location from "~/components/Location";
import RightNow from "~/components/RightNow";
import ThisHour from "~/components/ThisHour";
import NextLittleWhile from "~/components/NextLittleWhile";
import Alerts from "~/components/Alerts";
import ThisWeek from "~/components/ThisWeek";
import PoweredBy from "~/components/PoweredBy";
import { mapState, mapActions } from "vuex";
export default {
  async asyncData({ store }) {
    await store.dispatch("getWeatherData");
  },
  async beforeMount() {
    await this.updateCurrentLocation(window);
  },
  components: {
    ActiveAlerts,
    Locations,
    Location,
    NextLittleWhile,
    RightNow,
    ThisHour,
    Alerts,
    ThisWeek,
    PoweredBy
  },
  computed: {
    ...mapState(["isLocationsActive", "isUpdating"]),
    bodyClasses() {
      let classes = [];

      if (this.isLocationsActive) {
        classes.push("is-locations-active");
      }

      if (this.isUpdating) {
        classes.push("is-updating");
      }

      return classes.join(" ");
    }
  },
  methods: {
    ...mapActions(["updateCurrentLocation"])
  },
  head() {
    return {
      bodyAttrs: {
        class: this.bodyClasses
      }
    };
  }
};
</script>
<style lang="scss">
body.is-locations-active,
body.is-updating {
  &,
  * {
    overflow: hidden;
  }
}

body.is-updating {
  &,
  * {
    pointer-events: none;
  }
}

.main {
  background: white;
  transition: filter 500ms ease;

  &.is-locations-active {
    filter: brightness(0.9);
  }

  &.is-updating {
    filter: brightness(0.5);
  }
}
</style>
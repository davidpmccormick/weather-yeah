<template>
  <ul class="current-breakdown">
    <li>Sunrise {{formatTime(sunriseToday, true)}} &bull; Sunset {{formatTime(sunsetToday, true)}}</li>
    <li>Visibility {{round(currently.visibility)}} miles</li>
    <li>UV index {{currently.uvIndex}}</li>
    <li>Humidity {{round(currently.humidity * 100)}}% &bull; Dewpoint {{round(currently.dewPoint)}}&deg;</li>
    <li>Pressure {{round(currently.pressure)}}hPa {{pressureModulation}}</li>
    <li>Ozone {{round(currently.ozone)}}DU</li>
    <li>Cloud cover {{round(currently.cloudCover * 100)}}%</li>
    <li v-if="storm">Nearest storm {{storm}} mile{{storm !== 1 && 's'}} away</li>
    <li>Moon phase {{moonPhase}}</li>
  </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["currently", "hours"]),
    ...mapGetters(["sunriseToday", "sunsetToday", "moonPhase"]),
    storm() {
      return this.currently.nearestStormDistance;
    },
    pressureModulation() {
      const startOfHour = this.hours[0].pressure;
      const threeHoursTime = this.hours[2].pressure;
      const diff = threeHoursTime - startOfHour;
      const absDiff = Math.abs(diff);

      if (absDiff < 0.5) return "steady";

      const tendency = Math.sign(diff) > 0 ? "rising" : "falling";
      const amount = () => {
        if (absDiff < 1.5) return "slowly";
        if (absDiff < 3.5) return "";
        if (absDiff < 6) return "quickly";
        return "very quickly";
      };

      return `${tendency} ${amount()}`.trim();
    }
  }
};
</script>

<style lang="scss">
.current-breakdown {
  list-style: none;
  padding: 0;
  margin: 0;
  white-space: normal;

  li {
    border-bottom: 1px solid #ddd;
    padding: 12px 0;

    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>

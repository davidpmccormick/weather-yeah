<template>
  <ul class="current-breakdown">
    <li>Sunrise {{formatTime(sunriseToday, true)}} &bull; Sunset {{formatTime(sunsetToday, true)}}</li>
    <li>Visibility {{round(currently.visibility)}} miles</li>
    <li>UV index {{currently.uvIndex}}</li>
    <li>Humidity {{round(currently.humidity * 100)}}% &bull; Dewpoint {{round(currently.dewPoint)}}&deg;</li>
    <li>Pressure {{round(currently.pressure)}}hPa</li>
    <li>Ozone {{round(currently.ozone)}}DU</li>
    <li v-if="storm">Nearest storm {{storm}} mile{{storm !== 1 && 's'}} away</li>
  </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["currently"]),
    ...mapGetters(["sunriseToday", "sunsetToday"]),
    storm() {
      return this.currently.nearestStormDistance;
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

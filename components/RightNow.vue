<template>
  <div class="spaced">
    <div>
      <h2>Right now</h2>
      <p>{{currently.summary}}. {{round(currently.windSpeed)}}mph winds from the {{humanBearing(currently.windBearing).long}}. The UV index is {{currently.uvIndex}} and the nearest storm is {{currently.nearestStormDistance}} miles away.</p>
    </div>
    <div>
      <div class="flex align-center">
        <div
          :style="{ backgroundColor: colorForTemperature(currently.temperature), backgroundImage: `url(${iconSrc(currently.icon)})` }"
          style="margin-right: 20px; display: flex; width: 120px; height: 120px; align-items: center; justify-content: center; padding: 20px; border-radius: 9999px;background-size: 80%; background-repeat: no-repeat; background-position: center;"
        ></div>
        <div>
          <strong style="font-size: 3.6em;">{{round(currently.temperature)}}°</strong>
          <p
            style="color: #aaa; font-weight: bold"
          >Feels like {{round(currently.apparentTemperature)}}°</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currently"])
  }
};
</script>

<style>
</style>
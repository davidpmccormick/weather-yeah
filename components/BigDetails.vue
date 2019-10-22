<template>
  <div class="spaced">
    <p class="summary" v-if="minutely">{{minutely.summary}}</p>
    <p class="summary" v-else>{{currently.summary}}.</p>
    <div class="big-details">
      <div
        :style="{ backgroundColor: colorForTemperature(currently.temperature), backgroundImage: `url(${iconSrc(currently.icon)})` }"
        style="display: flex; width: 110px; height: 110px; align-items: center; justify-content: center; padding: 20px; border-radius: 9999px;background-size: 80%; background-repeat: no-repeat; background-position: center;"
      ></div>
      <div style="text-align: center;">
        <strong style="font-size: 3.6em;">{{round(currently.temperature)}}°</strong>
        <p
          style="color: #aaa; font-weight: bold; font-size: 14px;"
        >Feels like {{round(currently.apparentTemperature)}}°</p>
      </div>
      <div
        style="padding-right: 5px; font-weight: bold; display: flex; flex-direction: column; align-items: center"
      >
        <div class="wind-wiggle">
          <div
            style="font-size: 60px;"
            :style="{transform: `rotate(${currently.windBearing + 90}deg`}"
          >➤</div>
        </div>
        <span style="font-size: 14px;">{{currentlyWind}}</span>
        <span style="font-size: 14px;">{{humanBearing(currently.windBearing).long}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currently", "minutely", "location"]),
    currentlyWind() {
      const speed = this.round(this.currently.windSpeed);
      const gust = this.round(this.currently.windGust);

      return gust > speed ? `${speed}–${gust}mph` : `${speed}mph`;
    }
  },
  updated() {
    this.$emit("big-details-updated");
  }
};
</script>

<style lang="scss">
.big-details {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}
.summary {
  white-space: normal;
  padding-right: 20px;
}

.wind-wiggle {
  animation: windwiggle linear infinite 3s;
}

@keyframes windwiggle {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(5deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-5deg);
  }
}
</style>

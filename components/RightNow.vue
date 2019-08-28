<template>
  <div class="pad-row">
    <h2>Right now</h2>
    <p>{{currently.summary}}</p>
    <div>
      <div>icon: {{currently.icon}}</div>
      <div>
        <strong
          :style="{ color: colorForTemperature(currently.temperature) }"
        >{{round(currently.temperature)}}º</strong>
        <p>Feels like {{round(currently.apparentTemperature)}}º</p>
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
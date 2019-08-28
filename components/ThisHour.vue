<template>
  <div v-if="minutely">
    <h2>This hour</h2>
    <ol>
      <li v-for="minute in minutely.data" :key="minute.time">
        <span>intensity: {{minute.precipIntensity}}</span>
        <span>probability: {{minute.precipProbability}}</span>
        <span v-if="minute.precipType">type: {{minute.precipType}}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["minutely"])
  }
};
</script>

<style>
</style>

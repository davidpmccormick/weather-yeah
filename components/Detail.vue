<template>
  <div class="inline-grid full-width detail">
    <span>{{round(hour.temperature)}}º</span>
    <span>wind bearing: {{round(hour.windBearing)}}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["index"],
  computed: {
    ...mapState(["hours"]),
    hour() {
      return this.hours[this.index];
    }
  }
};
</script>

<style>
.detail {
  height: 100px;
  padding: 10px;
  color: white;
}
</style>

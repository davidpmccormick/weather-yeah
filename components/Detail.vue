<template>
  <div class="inline-grid full-width detail" :style="{background: colorForActiveHour}">
    <img :src="iconSrc(hours[activeBarIndex].icon)" style="width: 50px;">
    <span>{{hours[activeBarIndex].temperature}}°</span>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["colorForActiveHour"]),
    ...mapState(["hours", "activeBarIndex"])
  }
};
</script>

<style>
.detail {
  height: 85px;
  padding: 10px;
  color: white;
  border-radius: 6px;
  position: absolute;
  bottom: 0;
  z-index: 1;
}
</style>

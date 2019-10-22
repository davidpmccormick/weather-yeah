<template>
  <p
    @click="setIsLocationsActive(true)"
    :style="{color: colorForTemperature(currently.temperature)}"
    class="font-xs location truncate"
  >{{location || '...'}}</p>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["location", "currently"])
  },
  methods: {
    ...mapMutations(['setIsLocationsActive']),
  }
};
</script>

<style lang="scss">
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.location {
  position: fixed;
  top: 0;
  left: 20px;
  right: 20px;
  padding-top: 10px;
  background: white;
  z-index: 2;
  color: #aaa;
  font-weight: bold;
  padding-bottom: 2px;
  border-bottom: 1px solid;
}
</style>

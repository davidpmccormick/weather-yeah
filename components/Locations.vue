<template>
  <div class="locations" :class="{'is-active': isLocationsActive}">
    <div class="locations-actions">
      <span></span>
      <span
        :style="{color: colorForTemperature(currently.temperature)}"
        class="locations-action"
        @click="setIsLocationsActive(false)"
      >Done</span>
    </div>
    <h2>Locations</h2>
    <ul class="locations-list">
      <li @click="updateCurrentLocation" class="locations-location">Current location</li>
      <li
        class="locations-location"
        @click="updateLocation(favourite)"
        v-for="favourite in favourites"
        :key="favourite.name"
      >{{favourite.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["isLocationsActive", "currently", "favourites"])
  },
  methods: {
    ...mapActions(["updateLocation", "updateCurrentLocation"]),
    ...mapMutations(["setIsLocationsActive"])
  }
};
</script>

<style lang="scss">
.locations {
  border-radius: 10px 10px 0 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: white;
  z-index: 3;
  height: 100vh;
  transform: translateY(100vh);
  transition: transform 400ms ease;

  &.is-active {
    transform: translateY(10px);
  }

  h2 {
    font-size: 2em;
  }
}

.locations-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.locations-action {
  color: dodgerblue;
}
.locations-list {
  list-style: none;
  padding: 0;
}
.locations-location {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}
</style>

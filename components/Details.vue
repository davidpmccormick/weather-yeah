<template>
  <div class="wrapper details" :style="{ backgroundColor: colorForActiveHour }">
    <div
      ref="detailsRef"
      class="nowrap overflow-x-auto full-width snap-scroll"
      @scroll="throttleHandleDetailsScroll"
    >
      <Detail v-for="i in 16" :index="i - 1" :key="i"/>
    </div>
  </div>
</template>

<script>
import Detail from "~/components/Detail";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import throttle from "lodash.throttle";

export default {
  components: {
    Detail
  },
  mounted() {
    this.setDetailsEl(this.$refs.detailsRef);
  },
  created() {
    this.throttleHandleDetailsScroll = throttle(this.handleDetailsScroll, 100);
  },
  methods: {
    ...mapMutations(["setDetailsEl"]),
    ...mapActions(["handleDetailsScroll"])
  },
  computed: {
    ...mapState(["detailsEl"]),
    ...mapGetters(["activeBarIndex", "colorForActiveHour"])
  }
};
</script>

<style lang="scss">
.details {
  overflow: hidden;
  transition: background-color 500ms ease;
}
</style>
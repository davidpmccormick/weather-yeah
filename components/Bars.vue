<template>
  <div class="wrapper">
    <div
      class="overflow-x-auto grid grid-100-100 grid-gap snap-scroll nowrap"
      ref="barsRef"
      @scroll="debounceHandleBarsScroll"
    >
      <div class="full-width inline-grid">
        <div class="grid grid-gap grid-end grid-8">
          <Bar v-for="i in 8" :index="i - 1" :key="i"/>
        </div>
      </div>
      <div class="full-width inline-grid">
        <div class="grid grid-gap grid-end grid-8">
          <Bar v-for="i in 8" :index="i + 7" :key="i"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import Bar from "~/components/Bar";
import debounce from "lodash.debounce";

export default {
  components: { Bar },
  mounted() {
    this.setBarsEl(this.$refs.barsRef);
  },
  created() {
    this.debounceHandleBarsScroll = debounce(this.handleBarsScroll, 100);
  },
  methods: {
    ...mapActions(["handleBarsScroll"]),
    ...mapMutations(["setBarsEl"])
  }
};
</script>
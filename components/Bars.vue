<template>
  <div class="wrapper">
    <div class="overflow-x-auto grid grid-100-100 grid-gap snap-scroll nowrap">
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
      <div class="full-width inline-grid">
        <div class="grid grid-gap grid-end grid-8">
          <Bar v-for="i in 8" :index="i + 15" :key="i"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Bar from "~/components/Bar";
import Detail from "~/components/Detail";

export default {
  components: { Bar, Detail },
  methods: {
    ...mapMutations(["setBarsEl"])
  },
  computed: {
    ...mapGetters(["activeHour"])
  }
};
</script>
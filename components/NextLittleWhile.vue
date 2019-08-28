<template>
  <div>
    <div class="pad-row">
      <h2>Next little while</h2>
      <p>{{hourlySummary}}</p>
    </div>
    <Bars/>
    <Details/>
  </div>
</template>

<script>
import Bars from "~/components/Bars";
import Details from "~/components/Details";
import { mapState } from "vuex";

export default {
  components: { Bars, Details },
  computed: {
    ...mapState(["hourlySummary"])
  }
};
</script>
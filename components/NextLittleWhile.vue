<template>
  <div class="spaced">
    <div>
      <h2>Next little while</h2>
      <p>{{hourlySummary}}</p>
    </div>
    <div>
      <Bars/>
      <!-- <Detail/> -->
    </div>
  </div>
</template>

<script>
import Bars from "~/components/Bars";
import Detail from "~/components/Detail";
import { mapState } from "vuex";

export default {
  components: { Bars, Detail },
  computed: {
    ...mapState(["hourlySummary"])
  }
};
</script>
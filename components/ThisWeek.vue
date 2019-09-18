<template>
  <div class="spaced">
    <div>
      <h2>This week</h2>
      <p>{{ daily.summary }}</p>
    </div>
    <div>
      <ul class="no-padding">
        <Day v-for="i in 8" :index="i - 1" :key="i"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Day from "~/components/Day";

export default {
  components: {
    Day
  },
  computed: {
    ...mapState(["daily"])
  }
};
</script>

<style lang="scss">
.row {
  margin: 0 auto;
  grid-template-columns: 1fr 50px 1fr;
  grid-gap: 5px;
  margin-bottom: 3px;
  height: 40px;
}

.low {
  width: 40px;
  margin-right: 3px;
  border-radius: 6px 0 0 6px;
}

.date {
  text-align: center;
  letter-spacing: 0.05em;
}

.uppercase {
  text-transform: uppercase;
}

.pad {
  padding: 5px;
}

.pad-l {
  padding-left: 5px;
}

.pad-r {
  padding-right: 5px;
}

.pad-t {
  padding-top: 5px;
}

.pad-b {
  padding-bottom: 5px;
}

.rain {
  border-radius: 6px 0 0 6px;
}

.high {
  border-radius: 0 6px 6px 0;
}

.font-grey {
  color: grey;
}

.font-bold {
  font-weight: bold;
}

.font-s {
  font-size: 12px;
}

.font-white {
  color: white;
}

.icon-container {
  padding-right: 3px;
  border-radius: 0 6px 6px 0;
}
</style>

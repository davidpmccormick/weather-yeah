<template>
  <div class="date grid uppercase font-s">
    <span class="day pad-t">{{ formatDay(time) }}</span>
    <span class="number pad-b font-grey">{{ formatDate(time) }}</span>
  </div>
</template>

<script>
export default {
  props: ["time"]
};
</script>

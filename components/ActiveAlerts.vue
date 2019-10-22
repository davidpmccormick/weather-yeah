<template>
  <div v-if="activeAlerts.length > 0" class="active-alerts">
    <p v-for="alert in activeAlerts" :key="alert.title">
      <a :href="alert.uri" target="_blank">
      &#9888; {{alert.title}}:
      <span class="active-alert-time">{{formatDayDateAndTime(alert.time)}}—{{formatDayDateAndTime(alert.expires)}}</span>
    </a>
    </p>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState(['activeAlerts'])
  }

}
</script>

<style lang="scss">
.active-alerts {
  position: fixed;
  top: 0;
  left: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  border-radius: 0 0 6px 6px;
  z-index: 3;
  background: #ffce3c;
  font-weight: bold;
}

.active-alert-time {
}
</style>

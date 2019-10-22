<template>
  <div class="alerts" v-if="cleanedAlerts" @click="toggleIsAlertsActive">
    <h3 v-if="!isAlertsActive">Alerts</h3>
    <ul class="alerts-list spaced" v-if="isAlertsActive">
      <li v-for="alert in cleanedAlerts" :key="alert.title">
        <p class="alerts-heading">{{alert.title}}</p>
        <p>{{alert.description}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isAlertsActive: false,
    }
  },
  computed: {
    ...mapGetters(['cleanedAlerts'])
  },
  methods: {
    toggleIsAlertsActive() {
      this.isAlertsActive = !this.isAlertsActive;
    }
  }
}
</script>

<style lang="scss">
  .alerts {
    background: #ffce3c;
    padding: 10px 20px;
    border-radius: 6px;

    h3 {
      text-align: center;
    }
  }

  .alerts-heading {
    font-weight: bold;
    margin: 10px 0;
  }

  .alerts-list {
    list-style: none;
    padding: 0;
  }
</style>

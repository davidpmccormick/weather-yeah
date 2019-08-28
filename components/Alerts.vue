<template>
  <div v-if="alerts">
    <h2>Alerts</h2>
    <ul>
      <li v-for="alert in alerts" :key="alert.time">
        <p>severity: {{alert.severity}}</p>
        <p>{{alert.title}}</p>
        <p>{{alert.description}}</p>
        <p>regions: {{alert.regions.join(', ')}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['alerts'])
  }
}
</script>

<style>

</style>

<script setup lang="ts">
import { siteConfig } from '~/config/site'
</script>

<template>
  <div class="location-info">
    <h4>방문 안내</h4>
    <p class="address">{{ siteConfig.address.full }}</p>
    <p class="hours">영업시간: {{ siteConfig.hours.display }}</p>
  </div>
</template>

<style scoped>
.location-info {
  text-align: center;
  padding: 32px;
  border-top: 1px solid rgba(250, 250, 250, 0.06);
}

.location-info h4 {
  font-size: clamp(14px, 3vw, 18px);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #c9a227;
  margin-bottom: 16px;
}

.location-info .address {
  font-size: 16px;
  color: #fafafa;
  margin-bottom: 8px;
}

.location-info .hours {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
}
</style>

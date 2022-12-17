<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/storage'

export default {
  name: 'Dashboard',
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = getUserInfo().name
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

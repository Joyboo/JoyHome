<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import theme from '@/utils/theme'
import { getSettingsLocalStorage } from '@/utils'

export default {
  name: 'App',
  beforeCreate() {
    try {
      // 进入时触发主题设置
      theme.setColor(getSettingsLocalStorage('theme')).catch(_ => {})
    } catch (e) {
      console.error('main.js setTheme error', e)
    }
  }
}
</script>

<style lang="scss">
</style>

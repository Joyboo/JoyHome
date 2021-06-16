<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import setTheme from "@/utils/settings";
import {getSettingsLocalStorage} from "@/utils";

export default {
  name: 'App',
  beforeCreate() {
    try {
      // 进入时触发主题设置
      setTheme.set(getSettingsLocalStorage('theme')).catch(error => {})
    } catch (e) {
      console.error('main.js setTheme error', e)
    }
  }
}
</script>

<style lang="scss">
</style>

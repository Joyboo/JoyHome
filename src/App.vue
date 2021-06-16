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
  /*将ThemePicker主题组件本地化，2021-06-16，需特别注意elementui版本号*/
  @import "~@/assets/theme-chalk/2.13.2.css";
  /*todo 为何使用element-variables.scss改动不了主题色*/
  /*@import "~@/styles/element-variables.scss";*/
</style>

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="300" />
    </el-tooltip>
  </section>
</template>

<script>
  import BackToTop from '@/components/BackToTop'
  import {glbcfg} from "@/api/sysinfo";

  export default {
    name: 'AppMain',
    components: { BackToTop },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    },
    created() {
      glbcfg()
        .then(({code, msg, data}) => {
          if (!code)
          {
            return this.$message.error(msg)
          }
          this.$store.dispatch('config/setConfig', data)
        })
        .catch(error => {
          console.log("config/setConfig error ", error);
        })
    }
  }
</script>

<style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header+.app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

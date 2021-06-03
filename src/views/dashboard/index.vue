<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles', 'userinfo'])
  },
  created() {
    // 统一使用相同首页
    /*if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }*/
  },
  mounted() {
    // add by Joyboo 跳转到用户设置的默认打开页面
    if (typeof this.userinfo.extension.newnid != 'undefined')
    {
      const defaultView = this.userinfo.extension.newnid

      // 排除掉可能导致死循环的路由
      const redirect = ['/', '', '/dashboard', 'dashboard'].indexOf(defaultView) < 0

      if (redirect)
      {
        setTimeout(() => this.$router.push(defaultView), 1000)

        /*
        // 实测$nextTick不会跳转，原因未知
        this.$nextTick(() => {
          this.$router.push(defaultView)
        })*/
      }
    }
  }
}
</script>

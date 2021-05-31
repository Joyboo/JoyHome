<template>
  <menu-info
    :form="form"
    :loading="loading"
    @onsubmit="onSubmit"
    @changeSwitch="changeSwitch"
  />
</template>

<script>
import menuInfo from './component'
import { menuAdd } from '@/api/menu'

export default {
  name: 'menuadd',
  components: {
    menuInfo
  },
  data() {
    return {
      form: {
        pid: 0,
        title: '',
        fulltitle: '',
        name: '',
        path: '',
        component: '',
        redirect: '',
        icon: '',
        hidden: '0',
        breadcrumb: '1',
        affix: '0',
        sort: 9,
        noCache: 0
      },

      loading: false
    }
  },
  methods: {
    onSubmit() {

      this.loading = true

      menuAdd(this.form)
        .then(resp => {
          const { code } = resp
          if (code) {
            this.$message.success('操作成功')
            this.$router.push({ path: '/menu/index' })
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    changeSwitch(key) {
      this.form[key] = this.form[key] == '1' ? '0' : '1'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

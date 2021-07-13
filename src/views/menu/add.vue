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
import { closeTab } from '@/utils'

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
        .then(({ code }) => {
          if (code) {
            this.$message.success('操作成功')
            closeTab()
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

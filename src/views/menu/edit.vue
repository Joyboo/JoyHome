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
import { menuEdit } from '@/api/menu'
import { closeTab } from '@/utils'

export default {
  components: {
    menuInfo
  },
  data() {
    return {
      form: {
        id: 0,
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
        sort: 1,
        noCache: 0
      },

      loading: false
    }
  },
  mounted() {
    this.loading = true

    /* 编辑页参数 */
    this.form.id = this.$route.query.id
    menuEdit('get', { id: this.form.id })
      .then(({ code, msg, data }) => {
        if (!code) {
          return this.$message.error(msg)
        }
        this.form = data.data
      }).catch(error => {
        this.$message.error(error)
      })

    this.loading = false
  },
  methods: {
    onSubmit() {
      if (this.form.id <= 0) {
        this.$message.error('id出错了')
        return
      }

      this.loading = true

      menuEdit('post', this.form)
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

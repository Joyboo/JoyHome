<template>
  <menu-info
    :form="form"
    :cascader="cascader"
    :loading="loading"
    @onsubmit="onSubmit"
    @changeSwitch="changeSwitch"
  />
</template>

<script>
import menuInfo from './component'
import { cascaderTree, menuAdd } from '@/api/menu'

export default {
  components: {
    menuInfo
  },
  data() {
    return {
      form: {
        pid: 0,
        title: '',
        name: '',
        path: '',
        component: '',
        redirect: '',
        icon: '',
        hidden: '0',
        breadcrumb: '1',
        affix: '0',
        sort: 9
      },

      // 级联选择器
      cascader: {
        options: [], // 数据
        optioned: [], // 默认选中, value值
        props: {
          checkStrictly: true
          /* lazy: true, // 懒加载
            lazyLoad (node, resolve) {
            }*/
        }
      },
      loading: false
    }
  },
  mounted() {
    /* 上级菜单 级联选择 */
    var _this = this
    cascaderTree().then(resp => {
      const { data } = resp
      _this.cascader.options = data
    })
  },
  methods: {
    onSubmit() {
      if (typeof this.form.pid === 'object') {
        // 级联选择器传递的是包含父节点的多级数组，取最后一个
        this.form.pid = this.form.pid[this.form.pid.length - 1]
      }

      this.loading = true

      menuAdd(this.form).then(resp => {
        const { code } = resp
        this.loading = false
        if (code) {
          this.$message({
            type: 'success',
            message: '操作成功',
            duration: 1500,
            onClose: () => {
              this.$router.push({ path: '/menu/index' })
            }
          })
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
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

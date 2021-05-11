<template>
    <google-refund-cfg-info :loading="loading" :form="form" @submit="submit"></google-refund-cfg-info>
</template>

<script>
  import GoogleRefundCfgInfo from './component'
  import {googlerefountAdd} from '@/api/googlerefundcfg'

  export default {
    components: {
      GoogleRefundCfgInfo
    },
    data() {
      return {
        loading: false,
        form: {
          gameid: '',
          pkgbnd: '',
          file: ''
        }
      }
    },
    methods: {
      submit(){
        this.loading = true
        googlerefountAdd(this.form)
          .then(resp => {
            const {code, msg, data} = resp
            if (code) {
              this.loading = false
              this.$message({
                type: 'success',
                message: '操作成功',
                duration: 1500,
                onClose: () => {
                  this.$router.push({ path: '/google_refund_cfg/index' })
                }
              })
            } else {
              this.$message.error(msg || '操作失败')
            }
          })
          .catch(error => {
            this.loading = false
            this.$message.error(error)
          })
      }
    }
  }
</script>

<style scoped>

</style>

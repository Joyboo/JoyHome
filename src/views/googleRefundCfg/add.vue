<template>
    <google-refund-cfg-info :loading="loading" :form="form" @submit="submit"></google-refund-cfg-info>
</template>

<script>
  import GoogleRefundCfgInfo from './component'
  import {googlerefountAdd} from '@/api/googlerefundcfg'
  import {closeTab} from "@/utils";

  export default {
    name: 'googleRefundCfgadd',
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
              this.$message.success('操作成功')
              closeTab(this.$route.path, '/googleRefundCfg/index')
            } else {
              this.$message.error(msg || '操作失败')
            }
          })
          .catch(error => {
            this.$message.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>

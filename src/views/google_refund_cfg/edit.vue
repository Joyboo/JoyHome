<template>
  <google-refund-cfg-info :loading="loading" :form="form" @submit="submit"></google-refund-cfg-info>
</template>

<script>
  import GoogleRefundCfgInfo from './component'
  import {googlerefountEdit} from '@/api/googlerefundcfg'

  export default {
    components: {
      GoogleRefundCfgInfo
    },
    data() {
      return {
        loading: false,
        form: {
          id: 0,
          gameid: '',
          pkgbnd: '',
          file: ''
        }
      }
    },
    mounted() {
      this.form.id = this.$route.query.id
      this.loading = true
      googlerefountEdit('get', {id: this.form.id})
        .then(resp => {
          const {code, msg, data} = resp
          this.form = data.data
          if (this.form.gameid != '')
          {
            this.form.gameid = parseInt(this.form.gameid)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    methods: {
      submit(){
        this.loading = true
        googlerefountEdit('post', this.form)
          .then(resp => {
            const {code, msg, data} = resp
            if (code) {
              this.$message.success('操作成功')
              this.$router.push({ path: '/google_refund_cfg/index' })
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

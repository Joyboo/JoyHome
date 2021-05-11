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
          this.loading = false
          this.form = data.data
          if (this.form.gameid != '')
          {
            this.form.gameid = parseInt(this.form.gameid)
          }
        })
        .catch(error => {
          this.loading = false
          this.$message.error(error)
        })
    },
    methods: {
      submit(){
        this.loading = true
        googlerefountEdit('post', this.form)
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

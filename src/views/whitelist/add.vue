<template>
  <div class="view-container" v-loading="loading">
    <whitelist-info :form="form" @submit="submit"></whitelist-info>
  </div>
</template>

<script>
  import WhitelistInfo from './component'
  import {whitelistAdd} from '@/api/whitelist'

  export default {
    name: 'whitelistadd',
    components: {
      WhitelistInfo
    },
    data() {
      return {
        loading: false,
        form: {
          devid: '',
          name: '',
          status: '1'
        }
      }
    },
    methods: {
      submit() {
        this.loading = true
        whitelistAdd(this.form)
          .then(resp =>  {
            const {code, msg} = resp
            if (code)
            {
              this.$message.success(msg)
              this.$router.push({ path: '/whitelist/index' })
            } else {
              this.$message.error(msg || 'add error')
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

<template>
  <div class="view-container" v-loading="loading">
    <whitelist-info :form="form" @submit="submit"></whitelist-info>
  </div>
</template>

<script>
  import WhitelistInfo from './component'
  import {whitelistEdit} from '@/api/whitelist'

  export default {
    components: {
      WhitelistInfo
    },
    mounted() {
      this.loading = true
      this.form.id = this.$route.query.id
      whitelistEdit('get', {id: this.form.id})
        .then(resp => {
          this.form = resp.data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    data() {
      return {
        loading: false,
        form: {
          id: 0,
          devid: '',
          name: '',
          status: '1'
        }
      }
    },
    methods: {
      submit() {
        this.loading = true
        whitelistEdit('post', this.form)
          .then(resp => {
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

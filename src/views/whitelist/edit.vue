<template>
  <div class="info-container" v-loading="loading">
    <whitelist-info :form="form" @submit="submit"></whitelist-info>
  </div>
</template>

<script>
  import WhitelistInfo from './component'
  import {whitelistEdit} from '@/api/whitelist'
  import {closeTab} from "@/utils";

  export default {
    components: {
      WhitelistInfo
    },
    mounted() {
      this.loading = true
      this.form.id = this.$route.query.id
      whitelistEdit('get', {id: this.form.id})
        .then(({code, msg, data}) => {
          if (!code)
          {
            return this.$message.error(msg)
          }
          this.form = data.data
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
          .then(({code, msg}) => {
            if (code)
            {
              this.$message.success(msg)
              closeTab()
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

<template>
  <div class="info-container" v-loading="loading">
    <whitelist-info :form="form" @submit="submit"></whitelist-info>
  </div>
</template>

<script>
  import WhitelistInfo from './component'
  import {whitelistAdd} from '@/api/whitelist'
  import {closeTab} from "@/utils";

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

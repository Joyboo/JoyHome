<template>
  <div class="view-container" v-loading="loading">
    <crontab-info :form="form" @submit="submit"></crontab-info>
  </div>
</template>

<script>
  import CrontabInfo from './component'
  import {crontabAdd} from '@/api/crontab'

  export default {
    name: 'crontabadd',
    components: {
      CrontabInfo
    },
    data() {
      return {
        loading: false,
        form : {
          name: '',
          rule: '',
          rclass: '\\Linkunyuan\\EsUtility\\Task\\Crontab',
          eclass: '',
          method: '',
          args: [
            {
              key: '',
              value: ''
            }
          ],
          remark: '',
          status: 0,
          sys: [],
          server: []
        }
      }
    },
    methods: {
      submit() {
        this.loading = true
        crontabAdd(this.form)
          .then(resp => {
            const {code, msg, result} = resp
            if (code)
            {
              this.$message.success(msg)
              this.$router.push({ path: '/crontab/index' })
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

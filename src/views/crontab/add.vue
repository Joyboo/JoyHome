<template>
  <div v-loading="loading" class="view-container">
    <crontab-info :form="form" @submit="submit" />
  </div>
</template>

<script>
import CrontabInfo from './component'
import { crontabAdd } from '@/api/crontab'
import { closeTab } from '@/utils'

export default {
  name: 'crontabadd',
  components: {
    CrontabInfo
  },
  data() {
    return {
      loading: false,
      form: {
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
        .then(({ code, msg, data }) => {
          if (code) {
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

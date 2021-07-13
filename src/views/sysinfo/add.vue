<template>
  <div v-loading="loading" class="view-container">
    <sysinfo :form="form" @submit="submit" />
  </div>
</template>

<script>
import Sysinfo from './component'
import { sysinfoAdd } from '@/api/sysinfo'
import { closeTab } from '@/utils'

export default {
  name: 'sysinfoadd',
  components: {
    Sysinfo
  },
  data() {
    return {
      loading: false,
      form: {
        grpid: '',
        var: '',
        value: '',
        extension: {
          comment: '',
          type: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.loading = true
      sysinfoAdd(this.form)
        .then(({ code, msg }) => {
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

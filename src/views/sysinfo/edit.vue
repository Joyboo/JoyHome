<template>
  <div v-loading="loading" class="view-container">
    <sysinfo :form="form" @submit="submit" />
  </div>
</template>

<script>
import Sysinfo from './component'
import { sysinfoEdit } from '@/api/sysinfo'
import { closeTab, copyTo } from '@/utils'

export default {
  components: {
    Sysinfo
  },
  data() {
    return {
      loading: false,
      form: {
        id: 0,
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
  mounted() {
    this.loading = true
    this.form.id = this.$route.query.id
    sysinfoEdit('get', { id: this.form.id })
      .then(resp => {
        this.form = copyTo(this.form, resp.data.data)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    submit() {
      this.loading = true
      sysinfoEdit('post', this.form)
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

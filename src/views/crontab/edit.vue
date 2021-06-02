<template>
  <div class="view-container" v-loading="loading">
    <crontab-info :form="form" @submit="submit"></crontab-info>
  </div>
</template>

<script>
  import CrontabInfo from './component'
  import {crontabEdit} from '@/api/crontab'
  import {closeTab, copyTo} from "@/utils";

  export default {
    components: {
      CrontabInfo
    },
    mounted() {
      this.loading = true
      const id = this.$route.query.id
      crontabEdit('get', {id: id})
        .then(resp => {
          const { code, msg, data } = resp
          if (!code)
          {
            return this.$message.error(msg)
          }
          this.form = copyTo(this.form, data.data)
        })
        .finally(() => {
          this.loading = false
        })
    },
    data() {
      return {
        loading: false,
        form : {
          id: 0,
          name: '',
          rule: '',
          rclass: '',
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
        crontabEdit('post', this.form)
          .then(resp => {
            const {code, msg} = resp
            if (code) {
              this.$message.success('操作成功')
              closeTab(this.$route.path, '/crontab/index')
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

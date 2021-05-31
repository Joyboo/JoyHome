<template>
  <role-info :loading="loading" :form="form" @setloading="setloading" @submit="submit"></role-info>
</template>

<script>
  import RoleInfo from './component'
  import {roleAdd} from '@/api/role'

  export default {
    name: 'roleadd',
    components: {
      RoleInfo
    },
    data() {
      return {
        loading: false,
        form: {
          name: '',
          summary: '',
          nids: [],
        }
      }
    },
    methods: {
      setloading(val) {
        this.loading = val
      },
      submit() {
        this.loading = true
        roleAdd(this.form)
          .then(resp => {
            const {code, msg, data} = resp
            if (code)
            {
              this.$message.success(msg || '操作成功')
              this.$router.push({ path: '/role/index' })
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

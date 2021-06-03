<template>
  <role-info :loading="loading" :form="form" @setloading="setloading" @submit="submit"></role-info>
</template>

<script>
  import RoleInfo from './component'
  import {roleAdd} from '@/api/role'
  import {closeTab} from "@/utils";

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
          newnids: [],
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
          .then(({code, msg}) => {
            if (code)
            {
              this.$message.success(msg || '操作成功')
              closeTab(this.$route.path, '/role/index')
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

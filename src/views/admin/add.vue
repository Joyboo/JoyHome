<template>
    <admin-info :form="form" :loading.sync="loading" @submit="submit"></admin-info>
</template>

<script>
  import AdminInfo from './component'
  import {adminAdd} from '@/api/admin'
  import {closeTab} from "@/utils";

  export default {
    name: 'adminadd',
    components: {
      AdminInfo
    },
    data() {
      return {
        loading: false,
        form: {
          username: '',
          password: '',
          realname: '',
          rid: '',
          sort: 1,
          extension: {
            status: '1',
            gid: '', // 默认打开游戏
            newnid: 0, // 默认打开菜单
            nid: '',
            gameids: [],
            ntcids: []
          }
        }
      }
    },
    methods: {
      submit() {
        this.loading = true
        adminAdd(this.form)
          .then(({code, msg, data}) => {

            if (code)
            {
              this.$message.success(msg)
              closeTab(this.$route.path, '/admin/index')
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

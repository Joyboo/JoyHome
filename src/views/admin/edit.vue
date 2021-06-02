<template>
  <admin-info :form="form" :loading.sync="loading" @submit="submit"></admin-info>
</template>

<script>
  import AdminInfo from './component'
  import {adminEdit} from '@/api/admin'
  import {closeTab, copyTo} from '@/utils'

  export default {
    components: {
      AdminInfo
    },
    async mounted() {
      this.loading = true
      try {
        this.form.id = this.$route.query.id

        const {data} = await adminEdit('get', {id: this.form.id})
        this.form = copyTo(this.form, data.data)
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    data() {
      return {
        loading: false,
        form: {
          id: '',
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
        adminEdit('post', this.form)
          .then(resp => {
            const {code, msg, data} = resp

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

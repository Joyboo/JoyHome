<template>
  <div class="view-container">

    <table-data
      :loading.sync="loading"
      :data="tableData"
      pathname="role"
      @search="search"
    >
      <el-table-column align="center" sortable width="80" prop="id" label="ID" />
      <el-table-column align="center" prop="name" label="组名称" />
      <el-table-column align="center" prop="summary" label="组描述" />
    </table-data>
  </div>
</template>

<script>

import TableData from '@/components/TableData/info'
import { roleIndex } from '@/api/role'

export default {
  name: 'roleindex',
  components: {
    TableData
  },
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  activated() {
    this.search()
  },
  methods: {
    search() {
      this.loading = true
      roleIndex()
        .then(({ code, msg, data }) => {
          if (!code) {
            return this.$message.error(msg)
          }
          this.tableData = data.data || []
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

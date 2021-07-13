<template>
  <div class="view-container">

    <layout-filter :query="query" :loading="loading" @search="search" />

    <table-info :loading="loading" :data="tableData" pathname="expense" @search="search">

      <el-table-column width="80" align="center" prop="id" label="ID" sortable />
      <el-table-column align="center" sortable prop="etime" label="日期" />

      <el-table-column align="center" label="所属游戏">
        <template slot-scope="scope">
          <span>
            {{ gamelist[scope.row.gameid] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="所属包">
        <template slot-scope="scope">
          <span>
            {{ scope.row.pkgname }}({{ scope.row.pkgbnd }})
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="cost" label="成本（美元）" />

    </table-info>

    <pagination :total="total" :query="query" @search="search" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableInfo from '@/components/TableData/info'
import Pagination from '@/components/Pagination'
import LayoutFilter from '@/components/LayoutFilter'
import { expenseIndex } from '@/api/expense'

export default {
  name: 'expenseindex',
  components: {
    TableInfo,
    Pagination,
    LayoutFilter
  },
  data() {
    return {
      loading: false,
      total: 0,
      query: {
        gameid: '',
        pkgbnd: [],
        begintime: true,
        endtime: true
      },
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['size', 'gamelist'])
  },
  methods: {
    search() {
      this.loading = true
      const query = Object.assign({}, this.query, { pkgbnd: this.query.pkgbnd.join(',') })
      expenseIndex(query)
        .then(({ code, msg, data }) => {
          if (!code) {
            return this.$message.error(msg)
          }
          this.tableData = data.data || []
          this.total = data.totals || 0
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

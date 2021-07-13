<template>
  <div class="view-container">
    <layout-filter :query="query" :loading="loading" @search="search" />

    <table-data
      :loading="loading"
      :data="tableData"
      pathname="googleRefundCfg"
      @search="search"
    >
      <el-table-column align="center" width="80" prop="id" label="ID" />

      <el-table-column align="center" label="游戏名">
        <template slot-scope="scope">
          {{ gamelist[scope.row.gameid] }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="pkgbnd" label="包名" />

      <el-table-column align="center" prop="file" label="JSON文件" />

      <el-table-column width="80" align="center" label="状态">
        <template slot-scope="scope">
          <el-switch :value="scope.row.status == '0'" @change="chgStatus(scope.row.id, scope.row.status)" />
        </template>
      </el-table-column>
    </table-data>

    <pagination
      :total="total"
      :query="query"
      @search="search"
    />
  </div>
</template>

<script>
import LayoutFilter from '@/components/LayoutFilter'
import TableData from '@/components/TableData/info'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { googlerefountIndex, googlerefountEdit } from '@/api/googlerefundcfg'
import checkPermission from '@/utils/permission'

export default {
  name: 'googlerefundcfgindex',
  components: {
    LayoutFilter,
    TableData,
    Pagination
  },
  data() {
    return {
      query: {
        gameid: '',
        pkgbnd: []
      },
      loading: false,
      tableData: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['size', 'gamelist'])
  },
  methods: {
    search() {
      this.loading = true
      const query = Object.assign({}, this.query, { pkgbnd: this.query.pkgbnd.join(',') })
      googlerefountIndex(query)
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
    },
    chgStatus(id, status) {
      if (!checkPermission(['admin', '/googleRefountEdit/edit'])) {
        this.$confirm('对不起，没有权限', {
          type: 'error',
          showClose: false,
          showCancelButton: false
        }).catch(_ => {})
      } else {
        this.loading = true
        googlerefountEdit('post', { id: id, status: status == '1' ? 0 : 1 })
          .then(({ code, msg }) => {
            if (code) {
              this.$message.success('操作成功')
              this.search()
            } else {
              this.$message.error(msg)
            }
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped>

</style>

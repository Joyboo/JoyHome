<template>
  <div class="view-container">
    <layout-filter :query="query" @search="search"></layout-filter>

    <table-data
      :loading="loading"
      :data="tableData"
      pathname="googleRefundCfg"
      @search="search"
    >
      <el-table-column align="center" width="80" prop="id" label="ID" />

      <el-table-column align="center" label="游戏名">
        <template slot-scope="scope">
          {{ gamelist[scope.row.gameid]}}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="pkgbnd" label="包名" />

      <el-table-column align="center" prop="file" label="JSON文件" />

      <el-table-column width="80" align="center" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status == '0'" />
        </template>
      </el-table-column>
    </table-data>

    <pagination
      :total="total"
      :limit.sync="query.pSize"
      :page="query.cPage"
      @pagination="pagination"
    />
  </div>
</template>

<script>
  import LayoutFilter from '@/components/LayoutFilter'
  import TableData from '@/components/TableData/info'
  import Pagination from '@/components/Pagination'
  import {mapGetters} from "vuex";
  import {googlerefountIndex} from '@/api/googlerefundcfg'

  export default {
    name: 'googlerefundcfgindex',
    computed: {
      ...mapGetters(['size', 'gamelist'])
    },
    components: {
      LayoutFilter,
      TableData,
      Pagination
    },
    data() {
      return {
        query: {
          gameid: '',
          pkgbnd: [],
          cPage: 1,
          pSize: 20
        },
        loading: false,
        tableData: [],
        total: 0
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        this.loading = true
        googlerefountIndex(this.query)
          .then(resp => {
            const {code, msg, data} = resp
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
      pagination({page, limit}) {
        this.query.cPage = page
        this.query.pSize = limit
        this.search()
      }
    }
  }
</script>

<style scoped>

</style>

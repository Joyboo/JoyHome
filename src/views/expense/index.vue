<template>
  <div class="view-container">

    <layout-filter :query="query" @search="search"></layout-filter>

    <table-info :loading="loading" :data="tableData" @search="search" pathname="expense">

      <el-table-column width="80" align="center" prop="id" label="ID" sortable></el-table-column>
      <el-table-column align="center" sortable prop="etime" label="日期" ></el-table-column>

      <el-table-column align="center" label="所属游戏" >
        <template slot-scope="scope">
          <span>
            {{gamelist[scope.row.gameid]}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="所属包" >
        <template slot-scope="scope">
          <span>
            {{scope.row.pkgname}}({{scope.row.pkgbnd}})
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="cost" label="成本（美元）" ></el-table-column>

    </table-info>

    <pagination :total="total" :page="query.cPage" :limit="query.pSize"></pagination>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import TableInfo from '@/components/TableData/info'
  import Pagination from '@/components/Pagination'
  import LayoutFilter from '@/components/LayoutFilter'
  import {expenseIndex} from "@/api/expense";
  import {beforeDay} from "@/utils";

  export default {
    name: 'expenseindex',
    components: {
      TableInfo,
      Pagination,
      LayoutFilter
    },
    computed: {
      ...mapGetters(['size', 'gamelist'])
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        this.loading = true
        expenseIndex(this.query)
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
    },
    data() {
      return {
        loading: false,
        total: 0,
        query: {
          gameid: '',
          pkgbnd: [],
          cPage: 1,
          pSize: 20,
          begintime: true,
          endtime: true
        },
        tableData: []
      }
    }
  }
</script>

<style scoped>

</style>

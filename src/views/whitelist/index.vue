<template>
  <div class="view-container">

    <el-form :model="query" :size="size" :inline="true">
      <el-form-item>
        <el-input v-model="query.devid" clearable placeholder="设备号或备注"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search" icon="el-icon-search">查询
        </el-button>
      </el-form-item>

    </el-form>

    <table-data
      :loading="loading"
      :data="data"
      pathname="whitelist"
      @search="search"
    >

      <el-table-column sortable align="center" prop="id" label="ID" width="80" />
      <el-table-column align="center" prop="devid" label="设备号" />
      <el-table-column align="center" prop="name" label="备注" />

      <el-table-column width="80" align="center" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status == '1'" />
        </template>
      </el-table-column>

    </table-data>

    <pagination
      :total="total"
      :limit="query.pSize"
      :page="query.cPage"
      @pagination="pagination"
    />
  </div>
</template>

<script>
  import TableData from '@/components/TableData/info'
  import Pagination from '@/components/Pagination'
  import {whitelistIndex} from '@/api/whitelist'
  import {mapGetters} from "vuex";

  export default {
    components: {
      TableData,
      Pagination
    },
    computed: {
      ...mapGetters(['size'])
    },
    mounted() {
      this.search()
    },
    data() {
      return {
        loading: false,
        query: {
          devid: '',
          cPage: 1,
          pSize: 20,
        },
        data: [],
        total: 0
      }
    },
    methods: {
      search() {
        this.loading = true
        whitelistIndex(this.query)
          .then(resp => {
            const {code, msg, data} = resp
            this.data = data.data
            this.total = data.totals
          })
          .catch(error => {
            this.$message.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      },
      pagination({ page, limit }) {
        this.query.cPage = page
        this.query.pSize = limit
        this.search()
      },
    }
  }
</script>

<style scoped>

</style>

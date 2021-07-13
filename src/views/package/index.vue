<template>
  <div class="view-container">

    <layout-filter :query="query" :loading="loading" @search="search">
      <el-form-item>
        <el-input v-model="query.keyword" placeholder="包名或包id" clearable />
      </el-form-item>

      <el-form-item>
        <el-input v-model="query.id" placeholder="id" clearable />
      </el-form-item>
    </layout-filter>

    <table-data
      :loading="loading"
      :data="tableData"
      pathname="package"
      @search="search"
    >
      <el-table-column sortable align="center" width="80" prop="id" label="ID" />

      <el-table-column sortable align="center" prop="gameid" label="所属游戏">
        <template slot-scope="scope">
          {{ gamelist[scope.row.gameid] || '' }}
        </template>
      </el-table-column>

      <el-table-column sortable align="center" prop="name" label="包名" />

      <el-table-column sortable align="center" width="200" prop="pkgbnd" label="包id" />

      <el-table-column sortable align="center" width="100" prop="os" label="操作系统">
        <template slot-scope="scope">
          {{ packos[scope.row.os] || '' }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录密钥">
        <template slot-scope="scope">
          <span
            style="cursor: pointer"
            @click="openAlter(scope.row.extension.logkey || '')"
          >
            {{ scope.row.extension.logkey || '' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付密钥">
        <template slot-scope="scope">
          <span
            style="cursor: pointer"
            @click="openAlter(scope.row.extension.paykey || '')"
          >
            {{ scope.row.extension.paykey || '' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付回调">
        <template slot-scope="scope">
          {{ scope.row.extension.payurl || '' }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="qzf" label="切支付" />
    </table-data>

    <pagination
      :total="total"
      :query="query"
      @search="search"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { packageindex } from '@/api/package'
import pagination from '@/components/Pagination'
import TableData from '@/components/TableData/info'
import LayoutFilter from '@/components/LayoutFilter'

export default {
  name: 'packageindex',
  components: {
    pagination,
    TableData,
    LayoutFilter
  },
  data() {
    return {
      loading: false,
      query: {
        id: '',
        gameid: '',
        keyword: ''
      },
      total: 0,
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'size',
      'gamelist',
      'packos'
    ])
  },
  methods: {
    search() {
      this.loading = true
      packageindex(this.query)
        .then(({ code, msg, data }) => {
          if (!code) {
            return this.$message.error(msg)
          }
          this.loading = false
          this.tableData = data.data
          this.total = data.totals
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    openAlter(msg) {
      this.$alert(msg)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="view-container">

    <layout-filter :query="query" :loading.sync="loading" @search="search">

      <el-form-item>
        <el-input v-model="query.uid" placeholder="账号或玩家id" clearable @change="search" />
      </el-form-item>

      <template #after>
        <el-form-item style="float: right;">
          <export-data :query="query" export-url="/reg/export" />
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :column="column" :loading.sync="loading" :data="tableData">

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-permission="['admin', '/reg/detail']" type="primary" :size="size" plain @click="detail(scope.$index, scope.row)">
            <svg-icon icon-class="peoples" /> &nbsp;详情
          </el-button>
        </template>
      </el-table-column>

    </table-index>

    <pagination
      :total="total"
      :query="query"
      @search="search"
    />

  </div>

</template>

<script>

import { regIndex } from '@/api/reg'
import LayoutFilter from '@/components/LayoutFilter'
import { mapGetters } from 'vuex'
import ExportData from '@/components/ExportExcel/all'
import TableIndex from '@/components/TableData'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission'

export default {
  name: 'regindex',
  components: {
    LayoutFilter,
    ExportData,
    TableIndex,
    Pagination
  },
  directives: { permission },
  data() {
    return {
      loading: false,
      query: {
        gameid: '',
        pkgbnd: [],
        ProxyRegion: 'omz',
        begintime: true,
        endtime: true,
        uid: ''
      },
      total: 0,
      tableData: [],
      column: [
        {
          key: 'uid',
          text: 'ID',
          width: '100',
          sort: true
        },
        {
          key: 'username',
          text: '账号'
        },
        {
          key: 'itime',
          text: '注册时间',
          width: '160'
        },
        {
          key: 'pkgbnd',
          text: '包名'
        },
        {
          key: 'devid',
          text: '设备ID'
        },
        {
          key: 'exmodel',
          text: '设备型号',
          width: '150'
        },
        {
          key: 'ip',
          text: 'IP',
          width: '110'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  methods: {
    search() {
      if (this.query.gameid === '') {
        this.$message.error('请选择游戏')
        return
      }
      this.loading = true
      const query = Object.assign({}, this.query, { pkgbnd: this.query.pkgbnd.join(',') })
      regIndex(query)
        .then(({ code, msg, data }) => {
          if (!code) {
            this.$message.error(msg)
          } else {
            this.tableData = data.data || []
            this.total = data.totals || 0
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    detail(index, row) {
      this.$router.push({ path: '/reg/detail', query: { uid: row.uid, gameid: this.query.gameid, ProxyRegion: this.query.ProxyRegion }})
    }
  }
}
</script>

<style scoped>

</style>

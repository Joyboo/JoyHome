<template>
  <div class="view-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="danger">提醒：请先选择所属游戏再点搜索才能查看数据</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <layout-filter :query="query" @search="search">

      <el-form-item>
        <el-input v-model="query.uid" placeholder="账号或玩家id" clearable />
      </el-form-item>

      <template v-slot:after>
        <el-form-item style="float: right;">
          <export-data></export-data>
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :column="column" :loading="loading" :data="tableData">

      <el-table-column align="center" label="操作" width="120" >
        <template slot-scope="scope">
          <el-button type="primary" :size="size" plain @click="detail(scope.$index, scope.row)">
            <svg-icon icon-class="peoples" /> &nbsp;详情
          </el-button>
        </template>
      </el-table-column>

    </table-index>

    <pagination
      :total="total"
      :limit="query.pSize"
      :page="query.cPage"
      @pagination="pagination"
    />

  </div>

</template>

<script>

  import {regIndex} from '@/api/reg'
  import LayoutFilter from '@/components/LayoutFilter'
  import { mapGetters } from 'vuex'
  import {beforeDay} from '@/utils'
  import ExportData from '@/components/ExportExcel'
  import TableIndex from '@/components/TableData'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      LayoutFilter,
      ExportData,
      TableIndex,
      Pagination
    },
    computed: {
      ...mapGetters(['size'])
    },
    data() {
      const start = beforeDay()
      const end = new Date()
      // const range = [d.format(1), end.format(1)]
      const range = [start, end.getTime()]
      return {
        loading: false,
        query: {
          gameid: '',
          pkgbnd: [],
          ProxyRegion: 'omz',
          date: range,
          uid: '',
          pSize: 20,
          cPage: 1
        },
        total: 0,
        tableData: [],
        column: [
          {
            key: 'uid',
            text: 'ID',
            width: '100',
            sort: true,
          }
          ,{
            key: 'username',
            text: '账号'
          }
          ,{
            key: 'itime',
            text: '注册时间',
            width:'160'
          }
          ,{
            key: 'pkgbnd',
            text: '包名'
          }
          ,{
            key: 'devid',
            text: '设备ID'
          }
          ,{
            key: 'exmodel',
            text: '设备型号',
            width:'150'
          }
          ,{
            key: 'ip',
            text: 'IP',
            width:'110'
          }
        ]
      }
    },
    methods: {
      search() {
        if (this.query.gameid == '') {
          this.$message.error('请选择游戏')
          return
        }
        this.loading = true
        regIndex(this.query)
          .then(resp => {
            const {code, msg, data} = resp
            if (!code)
            {
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
      setLoading(val) {
        this.loading = val
      },
      detail(index, row) {
        this.$router.push({ path: '/reg/detail', query: { uid: row.uid, gameid: this.query.gameid, ProxyRegion: this.query.ProxyRegion }})
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

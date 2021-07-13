<template>
  <div class="view-container">

    <layout-filter :query="query" :loading="loading" @search="search">
      <el-form-item>
        <el-select v-model="query.pf" placeholder="请选择充值平台">
          <el-option label="全部" value="" />
          <el-option v-for="(payn, payk) in paypf" :key="payk" :label="payn" :value="payk" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.kwtype">
          <el-option v-for="(kwk, kwn) in kwtype" :key="kwn" :label="kwk" :value="kwn" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="query.kwvalue"
          clearable
          :placeholder="query.kwtype == 'expression' ? 'paysn=&uid=&sid=' : kwtype[query.kwtype]"
          @change="search"
        />
      </el-form-item>

      <template #after>
        <el-form-item style="float: right;">
          <export-data :query="query" export-url="/pay/export" />
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :column="column" :loading="loading" :data="tableData">

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.id != 'sum'" type="primary" :size="size" plain @click="detail(scope.$index, scope.row)">
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

    <!--详情-->
    <detail :query="detailQuery" :dialog="dialog" @setdialog="setdialog" />
  </div>
</template>

<script>
import LayoutFilter from '@/components/LayoutFilter'
import TableIndex from '@/components/TableData'
import { mapGetters } from 'vuex'
import { payIndex } from '@/api/reg'
import Pagination from '@/components/Pagination'
import Detail from './detail'
import ExportData from '@/components/ExportExcel/all'
import checkPermission from '@/utils/permission'

export default {
  name: 'payindex',
  components: {
    LayoutFilter,
    TableIndex,
    Pagination,
    Detail,
    ExportData
  },
  data() {
    return {
      loading: false,
      dialog: false,
      query: {
        gameid: '',
        pkgbnd: [],
        ProxyRegion: '',
        kwtype: 'paysn',
        kwvalue: '',
        begintime: true,
        endtime: true
      },
      // 查询订单详情参数
      detailQuery: {},
      kwtype: {
        uid: '玩家id',
        ordersn: '订单号',
        paysn: '官方订单号',
        sid: '区服id',
        expression: '表达式'
      },
      total: 0,
      tableData: [],
      column: [
        {
          key: 'instime',
          text: '订单号',
          width: '200',
          template: (index, row) => {
            if (row.id == 'sum') {
              return '<span style="color: red;">' + row.pk + '</span>'
            } else {
              return row.gameid + '-' + row.id + '-' + index
            }
          }
        },
        {
          key: 'paysn',
          text: '官方订单号',
          width: '200'
        },
        {
          key: 'extension',
          text: '区服id',
          width: '100',
          template: (index, row) => {
            if (!index) {
              return ''
            }
            return typeof index.sid == 'undefined' ? '' : index.sid
          }
        },
        {
          key: 'uid',
          text: 'UID',
          click: (index, row) => {
            const router = '/reg/detail'
            if (!checkPermission(['admin', router])) {
              this.$confirm('对不起,没有权限: ' + router, {
                type: 'error',
                showClose: false,
                showCancelButton: false
              }).catch(_ => {})
            } else {
              this.$router.push({
                path: router,
                query: { uid: index, gameid: row.gameid, ProxyRegion: this.query.ProxyRegion }
              })
            }
          },
          template: (index, row) => {
            return index ? ('<span style="cursor:pointer;color: ' + this.theme + '">' + index + '</span>') : ''
          }
        },
        {
          key: 'money',
          text: '金额',
          width: '120',
          tip: '美元',
          template: (index, row) => {
            return (index / 100).toFixed(2)
          }
        },
        {
          key: 'receipts',
          text: '分成后',
          width: '120',
          tip: '美元',
          template: (index, row) => {
            return (index / 100).toFixed(2)
          }
        },
        {
          key: 'utime',
          text: '支付时间'
        },
        {
          key: 'pf',
          text: '支付平台',
          width: '100',
          template: (index, row) => {
            return this.paypf[index] || index
          }
        },
        {
          key: 'gno',
          text: '特征',
          width: '50',
          tip: '注册当天的充值为新充值',
          template: (index, row) => {
            if (row.id == 'sum') {
              return ''
            }
            if (index) {
              return '<span style="color: #67C23A">普通</span>'
            } else {
              return '<span style="color: #E6A23C">新充</span>'
            }
          }
        },
        {
          key: 'exmodel',
          text: '设备型号'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['size']),
    paypf() {
      return this.$store.state.filter.pay.pf
    },
    theme() {
      return this.$store.state.settings.theme
    }
  },
  methods: {
    search() {
      this.loading = true
      const query = Object.assign({}, this.query, { pkgbnd: this.query.pkgbnd.join(',') })
      const { gameid } = query
      payIndex(query)
        .then(resp => {
          const { data } = resp
          if (data.data) {
            for (const i in data.data) {
              data.data[i].gameid = gameid
            }
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
    detail(index, row) {
      this.dialog = true
      this.detailQuery = {
        id: row.id,
        gameid: row.gameid,
        updtime: row.updtime
      }
    },
    // 详情页子组件设置dialog状态
    setdialog(val) {
      this.dialog = val
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="view-container">

    <layout-filter :query="query" :loading.sync="loading" @search="search">
      <el-form-item>
        <el-select v-model="query.status" placeholder="请选择订单状态" class="mySelect">
          <el-option label="全部" value="" />
          <el-option v-for="(sn, sk) in paystatus" :key="sk" :label="sn" :value="sk" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.pf" placeholder="请选择充值平台">
          <el-option label="全部" value="" />
          <el-option v-for="(payn, payk) in paypf" :key="payk" :label="payn" :value="payk" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.kwtype" class="mySelect">
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
          <export-data :query="query" export-url="/order/export" />
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :column="column" :loading.sync="loading" :data="tableData">

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.id != 'sum'" type="text" :size="size" @click="detail(scope.$index, scope.row)">
            <svg-icon icon-class="peoples" /> 详情
          </el-button>

          <el-button
            v-if="scope.row.status != 2"
            type="text"
            :size="size"
            style="color: #67C23A;"
            @click="callBackOrder(scope.$index, scope.row)"
          >
            <svg-icon icon-class="education" /> 补单
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
    <detail :query="detailQuery" :dialog.sync="dialog" />

    <!--补单-->
    <repair :query="repairQuery" :dialog.sync="repairDialog" />
  </div>
</template>

<script>
import LayoutFilter from '@/components/LayoutFilter'
import TableIndex from '@/components/TableData'
import { mapGetters, mapState } from 'vuex'
import { orderIndex } from '@/api/order'
import Pagination from '@/components/Pagination'
import Detail from './detail'
import Repair from './repair'
import ExportData from '@/components/ExportExcel/all'
import checkPermission from '@/utils/permission'

export default {
  name: 'orderindex',
  components: {
    LayoutFilter,
    TableIndex,
    Pagination,
    Detail,
    Repair,
    ExportData
  },
  data() {
    return {
      loading: false,
      query: {
        gameid: '',
        pkgbnd: [],
        status: '',
        ProxyRegion: 'omz',
        kwtype: 'paysn',
        kwvalue: ''
      },
      layoutConfig: {
        isBeginTime: true,
        isEndTime: true,
        showGame: 1,
        showPackage: 2,
        ProxyRegion: true
      },
      // detail组件参数
      dialog: false,
      detailQuery: {},
      kwtype: {
        uid: '玩家id',
        ordersn: '订单号',
        paysn: '官方订单号',
        sid: '区服id',
        expression: '表达式'
      },
      // repair组件参数
      repairDialog: false,
      repairQuery: {},

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
          key: 'itime',
          text: '下单时间'
        },
        {
          key: 'status',
          text: '状态',
          template: (index, row) => {
            return this.paystatus[index] || ''
          }
        },
        {
          key: 'utime',
          text: '支付时间',
          template: (index, row) => {
            return row.status > 0 ? index : ''
          }
        },
        {
          key: 'pf',
          text: '支付平台',
          template: (index, row) => {
            return this.paypf[index] || ''
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
    ...mapState({
      paypf: state => state.filter.pay.pf,
      paystatus: state => state.filter.pay.status,
      theme: state => state.settings.theme
    })
  },
  methods: {
    search() {
      this.loading = true
      const query = Object.assign({}, this.query, { pkgbnd: this.query.pkgbnd.join(',') })
      const { gameid } = query
      orderIndex(query)
        .then(({ code, msg, data }) => {
          if (!code) {
            return this.$message.error(msg)
          }
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
        instime: row.instime
      }
    },
    // 补单
    callBackOrder(index, row) {
      if (!checkPermission(['admin', '/order/callBackOrder'])) {
        this.$confirm('对不起，没有权限', {
          type: 'error',
          showClose: false,
          showCancelButton: false
        }).catch(_ => {})
      } else {
        this.repairDialog = true
        this.repairQuery = {
          pf: row.pf,
          ProxyRegion: this.query.ProxyRegion,
          gameid: row.gameid,
          ordersn: row.gameid + '-' + row.id + '-' + row.instime
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .mySelect {
    width: 120px;
  }
</style>

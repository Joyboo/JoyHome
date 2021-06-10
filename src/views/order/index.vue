<template>
  <div class="view-container">

    <layout-filter :query="query" @search="search">
      <el-form-item>
        <el-select v-model="query.status" placeholder="请选择订单状态" class="mySelect">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(sn, sk) in paystatus" :key="sk" :label="sn" :value="sk" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.pf" placeholder="请选择充值平台">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(payn, payk) in paypf" :key="payk" :label="payn" :value="payk" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.kwtype" class="mySelect">
          <el-option v-for="(kwk, kwn) in kwtype" :key="kwn" :label="kwk" :value="kwn" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="query.kwvalue" :placeholder="query.kwtype == 'expression' ? 'paysn=&uid=&sid=' : kwtype[query.kwtype]"></el-input>
      </el-form-item>

      <template #after>
        <el-form-item style="float: right;">
          <export-data :query="query" export-url="/order/export"></export-data>
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :column="column" :loading="loading" :data="tableData">

      <el-table-column align="center" label="操作" width="150" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.id != 'sum'" type="text" :size="size" @click="detail(scope.$index, scope.row)">
            <svg-icon icon-class="peoples" /> 详情
          </el-button>

          <el-button v-if="scope.row.status != 2" type="text" :size="size"
                     style="color: #67C23A;"
                     @click="callBackOrder(scope.$index, scope.row)">
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
    <detail :query="detailQuery" :dialog="dialog" @setdialog="setdialog"></detail>

    <!--补单-->
    <repair :query="repairQuery" :dialog="repairDialog" @setRepairDialog="setRepairDialog"></repair>
  </div>
</template>

<script>
  import LayoutFilter from '@/components/LayoutFilter'
  import TableIndex from '@/components/TableData'
  import {mapGetters} from "vuex";
  import {orderIndex} from '@/api/order'
  import Pagination from '@/components/Pagination'
  import Detail from './detail'
  import Repair from './repair'
  import ExportData from '@/components/ExportExcel/all'
  import checkPermission from "@/utils/permission";

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
    computed: {
      ...mapGetters(['size']),
      paypf() {
        return this.$store.state.filter.pay.pf
      },
      paystatus() {
        return this.$store.state.filter.pay.status
      },
      theme() {
        return this.$store.state.settings.theme
      }
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
          kwvalue: '',
          begintime: true,
          endtime: true
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
                return this.query.gameid + '-' + row.id + '-' + index
              }
            }
          }
          ,{
            key: 'paysn',
            text: '官方订单号',
            width: '200'
          }
          ,{
            key: 'extension',
            text: '区服id',
            width: '100',
            template: (index, row) => {
              if (!index) {
                return '';
              }
              return typeof index.sid  == 'undefined' ? '' : index.sid;
            }
          }
          ,{
            key: 'uid',
            text: 'UID',
            click: (index, row) => {
              let router = '/reg/detail'
              if (!checkPermission(['admin', router]))
              {
                this.$confirm('对不起,没有权限: ' + router, {
                  type: 'error',
                  showClose: false,
                  showCancelButton: false
                }).catch(error => {})
              } else {
                this.$router.push({
                  path: router,
                  query: { uid: index, gameid: this.query.gameid, ProxyRegion: this.query.ProxyRegion }
                })
              }
            },
            template: (index, row) => {
              return index ? ('<span style="cursor:pointer;color: ' + this.theme + '">'+ index +'</span>') : ''
            }
          }
          ,{
            key: 'money',
            text: '金额',
            width: '120',
            tip: '美元',
            template: (index, row) => {
              return (index / 100).toFixed(2);
            }
          }
          , {
            key: 'itime',
            text: '下单时间'
          }
          , {
            key: 'status',
            text: '状态',
            template: (index, row) => {
              return this.paystatus[index] || ''
            }
          }
          , {
            key: 'utime',
            text: '支付时间',
            template: (index, row) => {
              return row.status > 0 ? index : ''
            }
          }
          , {
            key: 'pf',
            text: '支付平台',
            template: (index, row) => {
              return this.paypf[index] || ''
            }
          }
          , {
            key: 'exmodel',
            text: '设备型号'
          }
        ]
      }
    },
    methods: {
      search() {
        this.loading = true
        orderIndex(this.query)
          .then(({code, msg, data}) => {
            if (!code)
            {
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
      detail(index, row) {
        this.dialog = true
        this.detailQuery = {
          id: row.id,
          gameid: this.query.gameid,
          instime: row.instime
        }
      },
      // 补单
      callBackOrder(index, row) {
        if (!checkPermission(['admin', '/order/callBackOrder']))
        {
          this.$confirm('对不起，没有权限', {
            type: 'error',
            showClose: false,
            showCancelButton: false
          }).catch(error => {})
        } else {
          this.repairDialog = true
          this.repairQuery = {
            pf: row.pf,
            ProxyRegion: this.query.ProxyRegion,
            gameid: this.query.gameid,
            ordersn: this.query.gameid + '-' + row.id + '-' + row.instime
          }
        }
      },
      // 详情页子组件设置dialog状态
      setdialog(val) {
        this.dialog = val
      },
      // 补单子组件设置dialog状态
      setRepairDialog() {
        this.repairDialog = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mySelect {
    width: 120px;
  }
</style>

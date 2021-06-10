<template>
  <div class="view-container">
    <layout-filter :query="query" @search="search">

      <el-form-item>
        <el-select v-model="query.voidedReason" placeholder="退款原因">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(vn, vk) in reasonType" :key="vk" :label="vn" :value="vk" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.whereKey" placeholder="查询条件">
          <el-option v-for="(wn, wk) in whereKey" :key="wk" :label="wn" :value="wk" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="query.whereValue" clearable :placeholder="query.whereKey ? whereKey[query.whereKey] : ''" />
      </el-form-item>

      <template #after>
        <el-form-item style="float: right;">
          <export-data :query="query" export-url="/google_refund/export"></export-data>
        </el-form-item>

        <!--<el-form-item style="float: right;">
          <el-button type="warning" icon="el-icon-upload2">导入</el-button>
        </el-form-item>-->
      </template>
    </layout-filter>

    <table-index :column="column" :loading="loading" :data="tableData"></table-index>

    <pagination
      :total="total"
      :query="query"
      @search="search"
    />

    <div style="clear: both;"></div>

    <pie-chart title="退款金额top 10 UID" :data="pietoall" style="float: left" width="50%" height="600px"></pie-chart>
    <pie-chart title="退款次数top 10 原因" :data="piereason" style="float: left" width="50%" height="600px"></pie-chart>
  </div>
</template>

<script>

  import {mapGetters} from "vuex";
  import TableIndex from '@/components/TableData'
  import {refundIndex} from "@/api/google_refund"
  import Pagination from '@/components/Pagination'
  import LayoutFilter from '@/components/LayoutFilter'
  import ExportData from '@/components/ExportExcel/all'
  import PieChart from './component/PieChart'

  export default {
    name: 'googlerefundindex',
    components: {
      TableIndex,
      Pagination,
      LayoutFilter,
      ExportData,
      PieChart
    },
    computed: {
      ...mapGetters(['size']),
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
          begintime: true,
          endtime: true,
          voidedReason: '',
          whereKey: '',
          whereValue: ''
        },
        total: 0,
        piereason: [],
        pietoall: [],
        // 退款原因
        reasonType: ['Other', 'Remorse', 'NotReceived', 'Defective', 'Accidental_purchase', 'Fraud', 'FriendlyFraud', 'Chargeback'],
        whereKey: {
          orderId: '订单号',
          uid: 'UID',
          devid: '设备id',
          'extension$.roleid': '角色id',
          'extension$.rolename': '角色名'
        },
        column: [
          {
            key: 'pkgbnd',
            text: '包名',
            width: '100',
            template: (index, row) => {
              if (row.h == '---') {
                return '<span style="color:red;" align="center">总合计</span>';
              } else if (row.h=='--') {
                return '<span style="color:red;" align="center">页合计</span>';
              } else {
                return index || '';
              }
            }
          }, {
            key: 'gameid',
            text: '游戏名',
            width: '80'
          }, {
            key: 'extension',
            text: '角色名',
            template: (index, row) => {
              if (!index)
              {
                return ''
              }
              return typeof index.rolename == 'undefined' ? '' : index.rolename
            }
          }, {
            key: 'extension',
            text: '角色id',
            template: (index, row) => {
              if (!index)
              {
                return ''
              }
              return typeof index.roleid == 'undefined' ? '' : index.roleid
            }
          }, {
            key: 'purchaseTimeMillis',
            text: '购买时间'
          }, {
            key: 'voidedTimeMillis',
            text: '取消/退款时间'
          }, {
            key: 'devid',
            text: '设备id'
          }, {
            key: 'uid',
            text: 'UID'
          }, {
            key: 'orderId',
            text: 'Google订单号'
          }, {
            key: 'pf',
            text: '储值方式',
            width: '80'
          }, {
            key: 'money',
            text: '价值',
            width: '80'
          }, {
            key: 'voidedReason',
            text: '原因'
          }, {
            key: 'bind',
            text: '绑定信息',
            template: (index, row) => {
              if (typeof row.h != 'undefined')
              {
                return ''
              }
              return '<span style="cursor:pointer;color: ' + this.theme + '">'+ index +'</span>'
            },
            click: (index, row) => {
              if (typeof row.h == 'undefined')
              {
                this.$alert(index)
              }
            }
          }
        ],
        tableData: []
      }
    },
    methods: {
      search() {
        this.loading = true
        refundIndex(this.query)
          .then(({code, msg, data}) => {
            if (!code)
            {
              return this.$message.error(msg)
            }
            this.tableData = data.data || []
            this.total = data.totals || 0
            this.piereason = data.reason || []
            this.pietoall = data.toall || []
          })
          .catch(error => {
            this.$message.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>

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

      <template v-slot:after>
        <el-form-item style="float: right;">
          <el-button type="warning" icon="el-icon-upload2">导入</el-button>
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :column="column" :loading="loading" :data="tableData"></table-index>

    <pagination
      :total="total"
      :limit="query.pSize"
      :page="query.cPage"
      @pagination="pagination"
    />
    <!-- todo 加饼状图-->
  </div>
</template>

<script>

  import {mapGetters} from "vuex";
  import TableIndex from '@/components/TableData'
  import {refundIndex} from "@/api/google_refund"
  import Pagination from '@/components/Pagination'
  import LayoutFilter from '@/components/LayoutFilter'
  import {beforeDay} from "@/utils";

  export default {
    name: 'google_refundindex',
    components: {
      TableIndex,
      Pagination,
      LayoutFilter
    },
    computed: {
      ...mapGetters(['size']),
      theme() {
        return this.$store.state.settings.theme
      }
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
          date: range,
          voidedReason: '',
          whereKey: '',
          whereValue: '',
          pSize: 20,
          cPage: 1
        },
        total: 0,
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
    mounted() {
      this.search()
    },
    methods: {
      search() {
        this.loading = true
        refundIndex(this.query)
          .then(resp => {
            const {data} = resp
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

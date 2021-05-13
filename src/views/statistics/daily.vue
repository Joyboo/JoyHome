<template>
  <div class="view-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="danger">提醒：请先选择所属游戏再点搜索才能查看数据</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <layout-filter :query="query" :data="tableData" :column="column" @search="search" :showExport="true"></layout-filter>

    <table-index :loading="loading" :data="tableData" :column="column" :heji="true"></table-index>

  </div>

</template>

<script>
import { daily } from '@/api/statistics'
import LayoutFilter from '@/components/LayoutFilter'
import TableIndex from '@/components/TableData'
import { mapGetters } from 'vuex'

export default {
  components: {
    LayoutFilter,
    TableIndex
  },
  computed: {
    ...mapGetters(['size'])
  },
  data() {
    const days = -14
    const d = new Date()
    const end = new Date()
    d.setTime(d.getTime() + 3600 * 1000 * 24 * days)
    // const range = [d.format(1), end.format(1)]
    const range = [d.getTime(), end.getTime()]
    return {
      loading: false,
      query: {
        gameid: [],
        pkgbnd: [],
        ProxyRegion: 'omz',
        tzn: '8',
        date: range
      },
      column: [
        {
          key: 'ymd',
          text: '日期',
          sort: true,
          template(index, row) {
            if (row.h === '--') {
              // return '<div class="danger">页合计</div>'
              return '页合计'
            } else if (row.h === '-') {
              return '总合计'
            } else {
              return index
            }
          }
        }, {
          key: 'reg',
          sort: true,
          text: '新增账号'
        }, {
          key: 'atv',
          sort: true,
          text: '激活设备'
        }, {
          key: 'login',
          sort: true,
          text: '活跃账号'
        }, {
          key: 'money',
          sort: true,
          text: '付费总额',
          tip: '美元'
        }, {
          key: 'nfs',
          text: '新增付费',
          tip: '新用户的充值（美元）'
        }, {
          key: 'persons',
          text: '付费账号'
        }, {
          key: 'nps',
          text: '新增付费账号',
          width: '150'
        }, {
          key: 'tas',
          text: '付费次数'
        }, {
          key: 'fftotal',
          text: '付费率',
          tip: '总付费人数/总登录人数'
        }, {
          key: 'ffl',
          text: '新增付费率',
          tip: '新增付费人数/注册数'
        }, {
          key: 'arpu',
          text: 'ARPU',
          tip: '总付费金额/总登录人数'
        }, {
          key: 'newArpu',
          text: '新增ARPU',
          tip: '新付费金额/新付费人数'
        }, {
          key: 'arppu',
          text: 'ARPPU',
          tip: '总付费金额/总付费人数'
        }, {
          key: 'newArppu',
          text: '新增ARPPU',
          tip: '新付费金额/新付费人数',
          width: '130'
        }
      ],
      tableData: []
    }
  },
  methods: {
    async search() {
      if (this.query.gameid.length <= 0) {
        this.$message.error('请选择游戏')
        return
      }
      this.loading = true
      const { code, msg, data } = await daily(this.query)

      this.loading = false

      if (!code) {
        return this.$message.error(msg)
      }
      this.tableData = data.data
    },
    summary(/*{ row, column, rowIndex, columnIndex }*/row) {
      console.log("summary=>", row)
      /*return {
        login: '10000',
        money: '20000'
      };*/
    }
  }
}
</script>

<style scoped>
  .danger {
    color: #F56C6C;
  }

  .crumbs {
    margin-bottom: 10px;

  }
</style>

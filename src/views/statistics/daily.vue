<template>
  <div class="view-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="danger">提醒：请先选择所属游戏再点搜索才能查看数据</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <layout-filter :query="query" @search="search" />

    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      border
      class="table"
      :size="size"
      height="200"
      header-row-class-name="list-table-header"
      :show-summary="true"
      :span-method="summary"
      sum-text="这是合计行"
    >

      <el-table-column sortable fixed align="center" prop="ymd" label="日期">
        <template slot-scope="scope">
          <div v-if="scope.row.h === '--'" class="danger">
            页合计
          </div>
          <div v-else-if="scope.row.h === '-'" class="danger">
            总合计
          </div>
          <div v-else>
            {{ scope.row.ymd }}
          </div>
        </template>
      </el-table-column>

      <el-table-column sortable align="center" prop="reg">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="新增账号" placement="top">
            <span>新增账号</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column width="1000" sortable align="center" prop="atv">

        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="激活设备" placement="top">
            <span>激活设备</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column sortable align="center" prop="login">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="活跃账号" placement="top">
            <span>活跃账号</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column sortable align="center" prop="money">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="美元" placement="top">
            <span>付费总额</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column sortable align="center" prop="nfs">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="新用户的充值（美元）" placement="top">
            <span>新增付费</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column sortable align="center" prop="persons">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="付费账号" placement="top">
            <span>付费账号</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="nps">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="新增付费账号" placement="top">
            <span>新增付费账号</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="tas">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="付费次数" placement="top">
            <span>付费次数</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="fftotal">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="总付费人数/总登录人数" placement="top">
            <span>付费率</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="ffl">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="新增付费人数/注册数" placement="top">
            <span>新增付费率</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="arpu">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="总付费金额/总登录人数" placement="top">
            <span>ARPU</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="newArpu">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="新付费金额/新付费人数" placement="top">
            <span>新增ARPU</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="arppu">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="总付费金额/总付费人数" placement="top">
            <span>ARPPU</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="newArppu">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="新付费金额/新付费人数" placement="top">
            <span>新增ARPPU</span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { daily } from '@/api/statistics'
import LayoutFilter from '@/components/LayoutFilter'
import { mapGetters } from 'vuex'

export default {
  components: {
    LayoutFilter
  },
  computed: {
    ...mapGetters([
      'size'
    ])
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

      console.log(this.$refs.multipleTable.$el)

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

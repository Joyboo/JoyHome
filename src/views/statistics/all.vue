<template>
  <div class="view-container">
    <layout-filter :query="query" :layout-config="layoutConfig" :loading.sync="loading" @search="search" @chgTzn="chgTzn">
      <template>
        <el-form-item v-for="(name, key) in menulist" :key="key">
          <el-button
            v-if="checkPermission(['admin', '/statistics/' + key])"
            :type="menu == key ? 'primary' : 'default'"
            round
            @click="chgRadio(key, true)"
          >{{ name.name }}</el-button>
        </el-form-item>
      </template>

      <template #after>
        <el-form-item style="float: right;">
          <export-data />
        </el-form-item>
      </template>
    </layout-filter>

    <component :is="using" :data="tableData" :loading.sync="loading" />
  </div>
</template>

<script>
import { statistics } from '@/api/statistics'
import LayoutFilter from '@/components/LayoutFilter'
import TableIndex from '@/components/TableData'
import ExportData from '@/components/ExportExcel'
import { mapGetters } from 'vuex'
import DailyComponent from './component/daily'
import LtvComponent from './component/ltv'
import RegkeepComponent from './component/regkeep'
import PaykeepComponent from './component/paykeep'
import RoiComponent from './component/roi'
import checkPermission from '@/utils/permission'

export default {
  name: 'statisticsall',
  components: {
    LayoutFilter,
    TableIndex,
    ExportData,
    DailyComponent,
    LtvComponent,
    RegkeepComponent,
    PaykeepComponent,
    RoiComponent
  },
  data() {
    return {
      using: '',
      loading: false,
      query: {
        gameid: [],
        pkgbnd: [],
        ProxyRegion: 'omz',
        tzn: '-5',
        begintime: true,
        endtime: true
      },
      layoutConfig: {
        isBeginTime: true,
        isEndTime: true,
        showGame: 2,
        showPackage: 2,
        ProxyRegion: true,
        tzn: true,
        nsch: false
      },
      tableData: [],
      menu: '',
      menulist: {
        roi: {
          name: '流水ROI',
          tzn: '8',
          components: 'RoiComponent'
        },
        droi: {
          name: '分成后ROI',
          tzn: '8',
          components: 'RoiComponent'
        },
        regkeep: {
          name: '注册留存',
          tzn: '-5',
          components: 'RegkeepComponent'
        },
        paykeep: {
          name: '付费留存',
          tzn: '-5',
          components: 'PaykeepComponent'
        },
        ltv: {
          name: 'LTV',
          tzn: '-5',
          components: 'LtvComponent'
        },
        daily: {
          name: '游戏日报',
          tzn: '-5',
          components: 'DailyComponent'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['size', 'gamelist'])
  },
  mounted() {
    this.chgRadio('daily', false)
  },
  methods: {
    checkPermission,
    search() {
      // 正常情况是在Layout-filter内search事件触发的Bus事件，此页面较特殊，并没有使用子组件的search来触发查询事件
      // 虽然在TableData组件加入data变量的侦听器也可以统一处理，但筛选区收起的动作会在data变化之后，这延长了用户等待时间
      this.$bus.$emit('changeFilterShow', false)
      this.loading = true
      const query = Object.assign({}, this.query, {
        pkgbnd: this.query.pkgbnd.join(','),
        gameid: this.query.gameid.join(',')
      })
      statistics(this.menu, query)
        .then(({ code, msg, data }) => {
          if (!code) {
            this.$message.error(msg)
            return
          }
          this.tableData = data.data || []
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    chgRadio(val, search) {
      this.tableData = []
      this.menu = val
      this.query.tzn = this.menulist[this.menu].tzn
      this.using = this.menulist[this.menu].components
      search && this.search()
    },
    chgTzn(val) {
      this.query.tzn = val
      this.search()
    }
  }
}
</script>

<style scoped>

</style>

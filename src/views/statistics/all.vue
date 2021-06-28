<template>
  <div class="view-container">
    <layout-filter :query="query" :nsch="false" @search="search" @chgTzn="chgTzn" :loading="loading">
      <template>
        <el-form-item v-for="(name, key) in menulist" :key="key">
          <el-button v-if="checkPermission(['admin', '/statistics/' + key])"
                     :type="menu == key ? 'primary' : 'default'"
                     @click="chgRadio(key)" round>{{name.name}}</el-button>
        </el-form-item>
      </template>

      <template #after>
        <el-form-item style="float: right;">
          <export-data></export-data>
        </el-form-item>
      </template>
    </layout-filter>

    <template v-if="menu == 'daily'">
      <daily-component :loading="loading" :dailydata="tableData"></daily-component>
    </template>

    <template v-else-if="menu == 'ltv'">
      <ltv-component :loading="loading" :ltvdata="tableData"></ltv-component>
    </template>

    <template v-else-if="menu == 'regkeep'">
      <regkeep-component :loading="loading" :regkeepdata="tableData"></regkeep-component>
    </template>

    <template v-else-if="menu == 'paykeep'">
      <paykeep-component :loading="loading" :paykeepdata="tableData"></paykeep-component>
    </template>

    <template v-else-if="menu == 'roi'">
      <roi-component :loading="loading" :roidata="tableData"></roi-component>
    </template>

    <template v-else-if="menu == 'droi'">
      <roi-component :loading="loading" :roidata="tableData"></roi-component>
    </template>
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
  import Bus from "@/utils/bus";

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
    computed: {
      ...mapGetters(['size', 'gamelist'])
    },
    data() {

      return {
        loading: false,
        query: {
          gameid: [],
          pkgbnd: [],
          ProxyRegion: 'omz',
          tzn: '-5',
          begintime: true,
          endtime: true
        },
        tableData: [],
        menu: 'daily',
        menulist: {
          roi: {
            name: '流水ROI',
            tzn: '8',
          },
          droi: {
            name: '分成后ROI',
            tzn: '8',
          },
          regkeep: {
            name: '注册留存',
            tzn: '-5',
          },
          paykeep: {
            name: '付费留存',
            tzn: '-5',
          },
          ltv: {
            name: 'LTV',
            tzn: '-5',
          },
          daily: {
            name: '游戏日报',
            tzn: '-5',
          }
        }
      }
    },
    mounted() {
      this.query.tzn = this.menulist[this.menu].tzn
    },
    methods: {
      checkPermission,
      search() {
        // 正常情况是在Layout-filter内search事件触发的Bus事件，此页面较特殊，并没有使用子组件的search来触发查询事件
        // 虽然在TableData组件加入data变量的侦听器也可以统一处理，但筛选区收起的动作会在data变化之后，这延长了用户等待时间
        Bus.$emit('changeFilterShow', false)
        this.loading = true
        statistics(this.menu, this.query)
          .then(({code, msg, data}) => {
            if (!code)
            {
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
      chgRadio(val) {
        this.tableData = [];
        this.menu = val
        this.query.tzn = this.menulist[this.menu].tzn
        this.search()
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

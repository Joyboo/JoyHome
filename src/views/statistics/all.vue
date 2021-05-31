<template>
  <div class="view-container">
    <layout-filter :query="query" @search="search">
      <template>
        <br>
        <el-form-item>
          <el-radio-group v-model="menu" style="margin-right: 100px;" @change="chgRadio">
            <el-radio v-for="(name, key) in menulist" :label="key" border v-if="checkPermission(['admin', '/statistics/' + key])">{{name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <template v-slot:after>
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
  import {beforeDay} from '@/utils'
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
          tzn: '8',
          begintime: true,
          endtime: true
        },
        tableData: [],
        menu: 'daily',
        menulist: {
          roi: '流水ROI',
          droi: '分成后ROI',
          regkeep: '注册留存',
          paykeep: '付费留存',
          ltv: 'LTV',
          daily: '游戏日报'
        }
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      checkPermission,
      search() {
        this.loading = true
        statistics(this.menu, this.query)
          .then(resp => {
            const {code, msg, data} = resp
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
      // 单选框变更时清空数据，因为旧数据和字段是对不上的
      chgRadio(label) {
        this.tableData = [];
      }
    }
  }
</script>

<style scoped>

</style>

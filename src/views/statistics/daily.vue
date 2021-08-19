<template>
  <div class="view-container">

    <layout-filter :query="query" :loading.sync="loading" :layout-config="layoutConfig" @search="search">
      <template #after>
        <el-form-item style="float: right;">
          <export-data />
        </el-form-item>
      </template>
    </layout-filter>

    <daily-component :loading.sync="loading" :data="tableData" />

  </div>

</template>

<script>
import { statistics } from '@/api/statistics'
import LayoutFilter from '@/components/LayoutFilter'
import { mapGetters } from 'vuex'
import ExportData from '@/components/ExportExcel'
import DailyComponent from './component/daily'

export default {
  name: 'statisticsdaily',
  components: {
    LayoutFilter,
    ExportData,
    DailyComponent
  },
  data() {
    return {
      loading: false,
      query: {
        gameid: [],
        pkgbnd: [],
        ProxyRegion: 'omz',
        tzn: '-5'
      },
      layoutConfig: {
        isBeginTime: true,
        isEndTime: true,
        showGame: 2,
        showPackage: 2,
        ProxyRegion: true,
        tzn: true
      },
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  methods: {
    search() {
      if (this.query.gameid.length <= 0) {
        this.$message.error('请选择游戏')
        return
      }
      this.loading = true
      const query = Object.assign({}, this.query, {
        pkgbnd: this.query.pkgbnd.join(','),
        gameid: this.query.gameid.join(',')
      })
      statistics('daily', query)
        .then(({ code, msg, data }) => {
          if (!code) {
            this.$message.error(msg)
          } else {
            this.tableData = data.data || []
          }
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

<template>
  <div class="view-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="danger">提醒：请先选择所属游戏再点搜索才能查看数据</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <layout-filter :query="query" @search="search">
      <template v-slot:after>
        <el-form-item style="float: right;">
          <export-data></export-data>
        </el-form-item>
      </template>
    </layout-filter>

    <regkeep-component :regkeepdata="tableData" :loading="loading"></regkeep-component>

  </div>
</template>

<script>
  import { statistics } from '@/api/statistics'
  import LayoutFilter from '@/components/LayoutFilter'
  import ExportData from '@/components/ExportExcel'
  import RegkeepComponent from './component/regkeep'

  export default {
    name: 'statisticsregkeep',
    components: {
      LayoutFilter,
      ExportData,
      RegkeepComponent
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
        tableData: []
      }
    },
    methods: {
      search() {
        if (this.query.gameid.length <= 0) {
          this.$message.error('请选择游戏')
          return
        }
        this.loading = true
        statistics('regkeep', this.query)
          .then(resp => {
            const {code, msg, data} = resp
            if (!code)
            {
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
      },
      setLoading(val) {
        this.loading = val
      }
    }
  }
</script>

<style scoped>

</style>

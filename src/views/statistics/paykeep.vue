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

    <paykeep-component :paykeepdata="tableData" :loading="loading"></paykeep-component>

  </div>
</template>

<script>
  import { statistics } from '@/api/statistics'
  import LayoutFilter from '@/components/LayoutFilter'
  import {beforeDay} from '@/utils'
  import ExportData from '@/components/ExportExcel'
  import PaykeepComponent from './component/paykeep'

  export default {
    name: 'statisticspaykeep',
    components: {
      LayoutFilter,
      ExportData,
      PaykeepComponent
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
          ProxyRegion: 'omz',
          tzn: '8',
          date: range
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
        statistics('paykeep', this.query)
          .then(resp => {
            const {code, msg, data} = resp
            if (!code)
            {
              this.$message.error(msg)
            } else {
              this.tableData = data.data
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

<template>
  <div class="view-container">

    <layout-filter :query="query" @search="search">
      <template #after>
        <el-form-item style="float: right;">
          <export-data></export-data>
        </el-form-item>
      </template>
    </layout-filter>

    <roi-component :roidata="tableData" :loading="loading"></roi-component>

  </div>
</template>

<script>
  import { statistics } from '@/api/statistics'
  import LayoutFilter from '@/components/LayoutFilter'
  import ExportData from '@/components/ExportExcel'
  import RoiComponent from './component/roi'
  import {mapGetters} from "vuex";

  export default {
    name: 'statisticsroi',
    components: {
      LayoutFilter,
      ExportData,
      RoiComponent
    },
    computed: {
      ...mapGetters(['size'])
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
        statistics('roi', this.query)
          .then(({code, msg, data}) => {
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

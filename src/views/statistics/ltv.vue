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
  import { statistics } from '@/api/statistics'
  import LayoutFilter from '@/components/LayoutFilter'
  import TableIndex from '@/components/TableData'
  import { mapGetters } from 'vuex'
  import {beforeDay} from '@/utils'

  export default {
    components: {
      LayoutFilter,
      TableIndex
    },
    computed: {
      ...mapGetters(['size', 'gamelist'])
    },
    data() {
      const start = beforeDay()
      const end = new Date()
      // const range = [d.format(1), end.format(1)]
      const range = [start, end.getTime()]

      const columnData = [
        {
          key: 'ymd',
          text: '日期',
          sort: true,
          fixed: true,
          template(index, row) {
            if (row.h === '--') {
              return '<div class="danger">页合计</div>'
            } else if (row.h === '-') {
              return '<div class="danger">总合计</div>'
            } else {
              return index
            }
          }
        }, {
          key: 'gameid',
          sort: true,
          text: '游戏',
          template: (index, row) => {
            return this.gamelist[index] || index
          }
        }, {
          key: 'reg',
          sort: true,
          text: '新增账号',
          width: '120'
        }
      ];

      const ds = [1,2,3,4,5,6,7,10,15,20,25,30,40,50,60,70,80,90,100,120];
      for(let k in ds)
      {
        columnData.push({
          key: 'd' + ds[k],
          text: ds[k] + '日',
          template: (data, rowObject) => {
            return data && rowObject.reg ? (data.sum/rowObject.reg).toFixed(2) : '';
          }
        });
      }

      return {
        loading: false,
        query: {
          gameid: [],
          pkgbnd: [],
          ProxyRegion: 'omz',
          tzn: '8',
          date: range
        },
        column: columnData,
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
        const { code, msg, data } = await statistics('ltv', this.query)

        this.loading = false

        if (!code) {
          return this.$message.error(msg)
        }
        this.tableData = data.data
      }
    }
  }
</script>

<style scoped>

</style>

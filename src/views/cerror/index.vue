<template>
  <div class="view-container">

    <layout-filter :query="query" @search="search" :loading="loading">
      <template>
        <el-form-item>
          <el-input type="text" v-model="query.username" placeholder="账号 | 用户名" clearable />
        </el-form-item>

        <el-form-item>
          <el-input type="text" v-model="query.msg" placeholder="msg | tag | info | url" clearable />
        </el-form-item>

        <el-form-item>
          <el-input type="text" v-model="query.content" placeholder="堆栈" clearable />
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :data="tableData" :loading="loading" :column="column" :border="false"></table-index>

    <pagination :total="total" :query="query" @search="search" />
  </div>
</template>

<script>

  import Pagination from '@/components/Pagination'
  import LayoutFilter from '@/components/LayoutFilter'
  import TableIndex from '@/components/TableData'
  import {mapGetters} from "vuex";
  import {cerrorIndex} from "@/api/cerror"

  export default {
    name: "cerror",
    computed: {
      ...mapGetters(['size'])
    },
    components: {
      Pagination,
      LayoutFilter,
      TableIndex
    },
    data() {
      return {
        loading: false,
        query: {
          begintime: true,
          endtime: true,
          username: '',
          msg: '',
          content: ''
        },
        total: 0,
        tableData: [],
        column: [
          {
            key: 'itime',
            text: '时间',
            sort: true,
            fixed: 'left',
            width: '150',
          }, {
            key: 'username',
            align: 'left',
            text: '用户信息',
            width: '150',
            template: (index, row) => {
              return '<b>UID</b>: ' + row.uid + '<br><b>用户名</b>: ' + row.realname + '<br><b>账号</b>:' + index
            }
          }, {
            key: 'msg',
            text: '错误信息',
            align: 'left',
            width: '300',
            template: (index, row) => {
              let html = '<span style="padding: 5px;">'
              html += '<br><b>Msg</b>:&nbsp;<span style="color: #F56C6C;background-color: #FFF5EE;">' + index + '</span>'
              html += '<br><b>Tag</b>:&nbsp;<span style="color: #E6A23C;background-color: #FFF5EE;">' + row.tag + '</span>'
              html += '<br><b>Info</b>:<span style="color: #909399;background-color: #FFF5EE;">' + row.info + '</span>'
              html += '<br><b>url</b>:&nbsp;<span style="color: #2E8B57;background-color: #FFF5EE;">'+ row.url + '</span>'
              html += '<span>'
              return html
            }
          }, {
            key: 'content',
            text: '堆栈跟踪'
          }
        ]
      }
    },
    methods: {
      setloading(val) {
        this.loading = val
      },
      search() {
        this.loading = true
        cerrorIndex(this.query)
          .then(({code, msg, data}) => {
            if (!code)
            {
              return this.$message.error(msg)
            }

            this.tableData = data.data || []
            this.total = data.totals || 0
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

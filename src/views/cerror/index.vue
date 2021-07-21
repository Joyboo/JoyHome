<template>
  <div class="view-container">

    <layout-filter :query="query" :loading.sync="loading" @search="search">
      <template>
        <el-form-item>
          <el-input v-model="query.username" type="text" placeholder="账号 | 用户名" clearable />
        </el-form-item>

        <el-form-item>
          <el-input v-model="query.msg" type="text" placeholder="msg | tag | info | url" clearable />
        </el-form-item>

        <el-form-item>
          <el-input v-model="query.content" type="text" placeholder="堆栈" clearable />
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :data="tableData" :loading.sync="loading" :column="column" :border="false">
      <template>

        <el-table-column min-width="380" align="left" label="错误信息" prop="msg">
          <template slot-scope="scope">
            <span>
              <div class="msgBox">
                <el-tag type="danger">Msg:&nbsp;&nbsp;{{ scope.row.msg }}</el-tag>
              </div>
              <div class="msgBox">
                <el-tag type="warning">Tag:&nbsp;&nbsp;{{ scope.row.tag }}</el-tag>
              </div>
              <div class="msgBox">
                <el-tag type="primary">Info:&nbsp;{{ scope.row.info }}</el-tag>
              </div>
              <div class="msgBox">
                <el-tag type="success">Url:&nbsp;&nbsp;{{ scope.row.url }}</el-tag>
              </div>
            </span>
          </template>
        </el-table-column>

        <el-table-column min-width="800" align="left" prop="content" label="堆栈跟踪">
          <template slot-scope="scope">
            <span class="textBox" @click="clip(regexText(scope.row.content), $event)" v-html="regexText(scope.row.content)" />
          </template>
        </el-table-column>

      </template>
    </table-index>

    <pagination :total="total" :query="query" @search="search" />
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'
import LayoutFilter from '@/components/LayoutFilter'
import TableIndex from '@/components/TableData'
import { mapGetters, mapState } from 'vuex'
import { cerrorIndex } from '@/api/cerror'
import clip from '@/utils/clipboard'

export default {
  name: 'cerror',
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
          width: '200'
        }, {
          key: 'username',
          align: 'left',
          text: '用户信息',
          width: '180',
          template: (index, row) => {
            return '<b>UID</b>: ' + row.uid + '<br><b>用户名</b>: ' + row.realname + '<br><b>账号</b>:' + index
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['size']),
    ...mapState({
      theme: state => state.settings.theme
    })
  },
  methods: {
    clip,
    regexText: function(value) {
      return value.replace(/\n/g, '<br />')
    },
    search() {
      this.loading = true
      cerrorIndex(this.query)
        .then(({ code, msg, data }) => {
          if (!code) {
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

  .textBox {
    cursor: pointer;
  }

  .msgBox {
    line-height: 38px;
  }
</style>

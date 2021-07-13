<template>
  <div class="view-container">

    <el-form :model="query" :size="size" :inline="true">
      <el-form-item>
        <el-select v-model="query.sys" style="width: 100px;" placeholder="运行系统">
          <el-option v-for="(s, k) in system" :key="k" :label="s" :value="k" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.status" style="width: 100px;" placeholder="状态">
          <el-option label="启用" value="0" />
          <el-option label="禁用" value="1" />
          <el-option label="运行一次" value="2" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="query.name" type="text" placeholder="任务名 | 方法" @change="search" />
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <table-info :loading.sync="loading" :data="tableData" pathname="crontab" @search="search">

      <el-table-column width="80" align="center" prop="id" label="ID" sortable />
      <el-table-column align="center" prop="name" label="任务名" />
      <el-table-column width="120" align="center" prop="rule" label="规则" />

      <el-table-column align="center" label="运行方法">
        <template slot-scope="scope">
          <span>
            {{ scope.row.eclass }}
            <i class="el-icon-right" />
            {{ scope.row.method }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="参数">
        <template slot-scope="scope">
          <json-viewer
            :value="scope.row.args || {}"
            :expand-depth="0"
            copyable
            :boxed="false"
            sort
          />
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" prop="server" label="运行服务器" />

      <el-table-column align="center" prop="sys" label="运行系统">
        <template slot-scope="scope">
          <span>
            <el-tag v-for="sys in scope.row.sys.split(',')" :key="sys" style="margin: 0 5px;" :type="tag[sys]">{{ system[sys] }}</el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" label="状态">
        <template slot-scope="scope">
          <el-switch :value="scope.row.status != '1'" @change="chgStatus(scope.row.id, scope.row.status)" />
        </template>
      </el-table-column>

      <el-table-column align="center" prop="remark" label="备注" />

    </table-info>

    <pagination :total="total" :query="query" @search="search" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableInfo from '@/components/TableData/info'
import { crontabIndex, crontabEdit } from '@/api/crontab'
import JsonViewer from 'vue-json-viewer'
import Pagination from '@/components/Pagination'
import checkPermission from '@/utils/permission'

export default {
  name: 'crontabindex',
  components: {
    TableInfo,
    Pagination,
    JsonViewer
  },
  data() {
    return {
      loading: false,
      tag: { 0: 'danger', 1: 'success', 2: 'info', 3: 'warning' },
      system: { 1: 'report', 2: 'pay', 3: 'sdk' },
      total: 0,
      query: {
        name: '',
        sys: '',
        status: ''
      },
      tableData: [],
      column: [
        {
          key: 'id',
          sort: true,
          text: 'ID',
          width: '100'
        }, {
          key: 'name',
          text: '任务名'
        }, {
          key: 'rule',
          text: '规则',
          width: '120'
        }, {
          key: '',
          text: '运行方法',
          template: (data, alldata) => {
            return alldata.eclass + ' -> ' + alldata.method
          }
        }, {
          key: 'args',
          text: '参数',
          align: 'left'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      this.loading = true
      crontabIndex(this.query)
        .then(({ code, msg, data }) => {
          if (!code) {
            return this.$message.error(msg)
          }
          this.tableData = data.data || []
          this.total = data.totals || 0
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    chgStatus(id, status) {
      if (!checkPermission(['admin', '/crontab/edit'])) {
        this.$confirm('对不起，没有权限', {
          type: 'error',
          showClose: false,
          showCancelButton: false
        }).catch(_ => {})
      } else {
        this.loading = true
        crontabEdit('post', { id: id, status: status == '1' ? 0 : 1 })
          .then(({ code, msg }) => {
            if (code) {
              this.$message.success('操作成功')
              this.search()
            } else {
              this.$message.error(msg)
            }
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
}
</script>

<style scoped>

</style>

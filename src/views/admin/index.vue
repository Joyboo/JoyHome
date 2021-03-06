<template>
  <div class="view-container">

    <el-form :model="query" :size="size" :inline="true">
      <el-form-item>
        <el-select v-model="query.rid" filterable placeholder="--所属组--">
          <el-option
            v-for="item in rolelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="query.keyword" clearable placeholder="姓名或手机号" @change="search" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.deltime" filterable placeholder="状态">
          <el-option label="全部" value="" />
          <el-option label="正常" value="1" />
          <el-option label="锁定" value="2" />
          <el-option label="已删除" value="3" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" icon="el-icon-search" @click="search">查询
        </el-button>
      </el-form-item>

    </el-form>

    <table-data
      :loading.sync="loading"
      :data="data"
      :btn-width="300"
      pathname="admin"
      @search="search"
    >

      <el-table-column sortable align="center" prop="id" label="ID" width="80" />
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" prop="realname" label="真实姓名" />

      <el-table-column align="center" label="角色组">
        <template slot-scope="scope">
          {{ rlist[scope.row.rid] }}
        </template>
      </el-table-column>

      <el-table-column sortable align="center" prop="sort">
        <template slot="header">
          <el-tooltip class="item" effect="dark" content="越小越靠前" placement="top">
            <span>排序</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <template v-if="scope.row.deltime > 0">
            <el-tag type="danger">已删除</el-tag>
          </template>
          <template v-else-if="scope.row.extension.status == 0">
            <el-tag type="warning">锁定</el-tag>
          </template>
          <template v-else>
            <el-tag type="success">正常</el-tag>
          </template>
        </template>
      </el-table-column>

      <template #btn="btn">
        <el-button
          v-permission="['admin', '/admin/gettoken']"
          :size="size"
          type="warning"
          style="margin: 0 2px;"
          plain
          @click="getAdminToken(btn.row)"
        >token</el-button>
      </template>
    </table-data>

    <pagination :total="total" :query="query" @search="search" />
  </div>
</template>

<script>
import TableData from '@/components/TableData/info'
import Pagination from '@/components/Pagination'
import { rolelist } from '@/api/role'
import { adminIndex, adminToken } from '@/api/admin'
import { mapGetters } from 'vuex'
import permission from '@/directive/permission'

export default {
  name: 'adminindex',
  directives: { permission },
  components: {
    TableData,
    Pagination
  },
  data() {
    return {
      loading: false,
      rolelist: [],
      rlist: {}, // 未经处理的数据
      query: {
        rid: '',
        keyword: '',
        deltime: '1'
      },
      data: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  mounted() {
    rolelist().then(({ data }) => {
      this.rlist = data

      for (const i in data) {
        this.rolelist.push({
          label: data[i],
          value: i
        })
      }
    })
    this.search()
  },
  methods: {
    search() {
      this.loading = true
      adminIndex(this.query)
        .then(({ code, msg, data }) => {
          if (!code) {
            return this.$message.error(msg)
          }
          this.data = data.data || []
          this.total = data.totals || 0
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getAdminToken(row) {
      this.loading = true
      adminToken({ id: row.id })
        .then(({ code, msg, data }) => {
          if (!code) {
            return this.$message.error(msg)
          }
          this.$alert(data, row.realname + ' 的token为：', { showClose: false })
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

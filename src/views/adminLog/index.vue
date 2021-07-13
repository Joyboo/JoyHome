<template>

  <div class="view-container">
    <layout-filter :query="query" :loading.sync="loading" @search="search">
      <template>
        <el-form-item>
          <el-input v-model="query.uid" type="text" placeholder="用户id | 用户名" clearable @change="search" />
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :data="tableData" :loading.sync="loading" :column="column" :border="false" />

    <pagination :total="total" :query="query" @search="search" />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import LayoutFilter from '@/components/LayoutFilter'
import TableIndex from '@/components/TableData'
import { adminLogIndex } from '@/api/admin_log'

export default {
  name: 'adminlogindex',
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
        endtime: true
      },
      total: 0,
      tableData: [],
      column: [
        {
          key: 'id',
          text: 'ID',
          width: 100,
          sort: true
        },
        {
          key: 'name',
          text: '管理员'
        },
        {
          key: 'uid',
          text: '管理员ID',
          width: 100
        },
        {
          key: 'itime',
          text: '登录时间',
          sort: true
        },
        {
          key: 'utime',
          text: '更新时间',
          sort: true
        },
        {
          key: 'ip',
          text: '登录ip'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  methods: {
    search() {
      this.loading = true
      adminLogIndex(this.query)
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

<style scoped>

</style>

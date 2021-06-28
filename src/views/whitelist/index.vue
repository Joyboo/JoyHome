<template>
  <div class="view-container">

    <el-form :model="query" :size="size" :inline="true">
      <el-form-item>
        <el-input v-model="query.devid" clearable placeholder="设备号或备注"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" @click="search" icon="el-icon-search">查询
        </el-button>
      </el-form-item>

    </el-form>

    <table-data
      :loading="loading"
      :data="data"
      pathname="whitelist"
      @search="search"
    >

      <el-table-column sortable align="center" prop="id" label="ID" width="80" />
      <el-table-column align="center" prop="devid" label="设备号" />
      <el-table-column align="center" prop="name" label="备注" />

      <el-table-column width="80" align="center" label="状态">
        <template slot-scope="scope">
            <el-switch v-model="scope.row.status == '1'" @change="chgStatus(scope.row.id, scope.row.status)" />
        </template>
      </el-table-column>

    </table-data>

    <pagination
      :total="total"
      :query="query"
      @search="search"
    />
  </div>
</template>

<script>
  import TableData from '@/components/TableData/info'
  import Pagination from '@/components/Pagination'
  import {whitelistIndex, whitelistEdit} from '@/api/whitelist'
  import {mapGetters} from "vuex";
  import checkPermission from "@/utils/permission";

  export default {
    name: 'whitelistindex',
    components: {
      TableData,
      Pagination
    },
    computed: {
      ...mapGetters(['size'])
    },
    mounted() {
      this.search()
    },
    data() {
      return {
        loading: false,
        query: {
          devid: ''
        },
        data: [],
        total: 0
      }
    },
    methods: {
      search() {
        this.loading = true
        whitelistIndex(this.query)
          .then(({code, msg, data}) => {
            if (!code)
            {
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
      chgStatus(id, status) {
        if (!checkPermission(['admin', '/whitelist/edit']))
        {
          this.$confirm('对不起，没有权限', {
            type: 'error',
            showClose: false,
            showCancelButton: false
          }).catch(error => {})
        } else {
          this.loading = true
          whitelistEdit('post', {id: id, status: status == '1' ? 0 : 1})
            .then(({code, msg}) => {
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

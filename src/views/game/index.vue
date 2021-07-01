<template>
  <div class="view-container">

    <div class="searchBox">
      <el-form ref="package-search" :model="query" :size="size" :inline="true" height="150">

        <el-form-item>
          <el-select v-model="query.type" filterable clearable placeholder="有效性">
            <el-option
              v-for="item in typelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="query.keyword" @change="search" placeholder="游戏名" clearable />
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" type="primary" @click="search">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <table-data
      :loading="loading"
      :data="tableData"
      pathname="game"
      @search="search"
    >
      <el-table-column sortable align="center" width="80" prop="id" label="ID" />

      <el-table-column align="center" prop="name" label="名称" />

      <el-table-column align="center" label="登录密钥">
        <template slot-scope="scope">
          <span
            style="cursor: pointer"
            @click="openAlter(scope.row.extension.logkey || '')"
          >
            {{ scope.row.extension.logkey || '' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付密钥">
        <template slot-scope="scope">
          <span
            style="cursor: pointer"
            @click="openAlter(scope.row.extension.paykey || '')"
          >
            {{ scope.row.extension.paykey || '' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" prop="isshow" label="是否显示">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isshow == '1'" @change="chgShow(scope.row.id, scope.row.isshow)" />
        </template>
      </el-table-column>

      <el-table-column sortable width="80" align="center" prop="sort" label="排序" />
    </table-data>

    <pagination
      :total="total"
      :query="query"
      @search="search"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableData from '@/components/TableData/info'
import pagination from '@/components/Pagination'
import { gameIndex, gameEdit } from '@/api/game'
import checkPermission from "@/utils/permission"

export default {
  name: 'gameindex',
  components: {
    pagination,
    TableData
  },
  computed: {
    ...mapGetters(['size'])
  },
  data() {
    return {
      query: {
        type: '',
        keyword: ''
      },
      total: 0,
      tableData: [],
      typelist: [
        {
          label: '仅显示有效',
          value: ''
        }, {
          label: '显示',
          value: '1'
        }, {
          label: '隐藏',
          value: '2'
        }, {
          label: '已删除',
          value: '3'
        }
      ],
      loading: false
    }
  },
  async mounted() {
    await this.$store.dispatch('filter/gameInfo')
    this.search()
  },
  methods: {
    search() {
      this.loading = true
      gameIndex(this.query)
        .then(({code, msg, data}) => {
          if (!code)
          {
            return this.$message.error(msg)
          }
          this.tableData = data.data
          this.total = data.totals
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    openAlter(msg) {
      this.$alert(msg)
    },
    chgShow(id, show) {
      if (!checkPermission(['admin', '/game/edit']))
      {
        this.$confirm('对不起，没有权限', {
          type: 'error',
          showClose: false,
          showCancelButton: false
        }).catch(error => {})
      } else {
        this.loading = true
        gameEdit('post', {id: id, isshow: show == '1' ? 0 : 1})
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
  .el-button {
    margin: 0 2px;
  }

</style>

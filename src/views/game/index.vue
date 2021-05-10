<template>
  <div class="view-container">

    <div class="searchBox">
      <el-form ref="package-search" :model="search" :size="size" :inline="true" height="150">

        <el-form-item>
          <el-select v-model="search.type" filterable clearable placeholder="有效性">
            <el-option
              v-for="item in typelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="search.keyword" placeholder="游戏名" clearable />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        :size="size"
        border
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >

        <el-table-column align="center" width="80" prop="id" label="ID" />

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
            <el-switch v-model="scope.row.isshow == '1'" />
          </template>
        </el-table-column>

        <el-table-column width="80" align="center" prop="sort" label="排序" />

        <el-table-column align="center" width="200" prop="isshow" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" :size="size" plain @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm
              confirm-button-text="我意已决"
              cancel-button-text="只是手抖"
              confirm-button-type="danger"
              icon="el-icon-info"
              icon-color="red"
              title="确定要删除吗？"
              @onConfirm="confirmDelete(scope.$index, scope.row)"
            >
              <el-button slot="reference" type="danger" :size="size" plain>删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>

      </el-table>
    </template>

    <pagination
      :total="total"
      :pagesize="search.pSize"
      :currentpage="search.cPage"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from '@/layout/components/Pagination'
import { gameIndex, gameDelete } from '@/api/game'

export default {
  components: {
    pagination
  },
  computed: {
    ...mapGetters([
      'size'
    ])
  },
  data() {
    return {
      search: {
        type: '',
        keyword: '',
        pSize: 20,
        cPage: 1
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
  mounted() {
    this.$store.dispatch('filter/gameInfo')
    this.getData()
  },
  methods: {
    // 改变每页大小
    handleSizeChange(val) {
      this.search.pSize = val
      this.getData()
    },
    // 点击页码
    handleCurrentChange(val) {
      this.search.cPage = val
      this.getData()
    },
    getData() {
      this.loading = true
      gameIndex(this.search).then(resp => {
        this.loading = false
        this.tableData = resp.data.data
        this.total = resp.data.totals
      })
    },
    openAlter(msg) {
      this.$alert(msg)
    },
    edit(index, row) {
      this.$router.push({ path: '/game/edit', query: { id: row.id }})
    },
    confirmDelete(index, rows) {
      this.loading = true
      gameDelete({ id: rows.id })
        .then(resp => {
          this.loading = false
          if (resp.code) {
            this.$message.success('操作成功')
            this.getData()
          }
        })
        .catch(error => {
          this.loading = false
          this.$message.success('操作失败')
        })
    }
  }
}
</script>

<style scoped>
  .el-button {
    margin: 0 2px;
  }

</style>

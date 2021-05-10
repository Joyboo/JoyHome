<template>
  <div>
    <div class="view-container">
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

          <el-table-column align="left" prop="title" label="菜单名" />

          <el-table-column align="left" prop="name" label="name" />

          <el-table-column prop="path" label="path" />

          <el-table-column prop="redirect" label="重定向" />

          <el-table-column prop="component" label="组件" />

          <el-table-column prop="icon" align="center" label="图标" width="80">
            <template slot-scope="scope">
              <i :class="scope.row.icon" />
            </template>
          </el-table-column>

          <el-table-column width="80" align="center" prop="hidden" label="是否隐藏">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.hidden == '1'" />
            </template>
          </el-table-column>

          <!--<el-table-column width="80" align="center" prop="isshow" label="是否显示在面包屑">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.breadcrumb == '1'">
              </el-switch>
            </template>
          </el-table-column>-->

          <el-table-column width="80" align="center" prop="sort" label="排序" />

          <el-table-column align="center" prop="isshow" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" :size="size" plain @click="edit(scope.$index, scope.row)">编辑</el-button>
              <el-popconfirm
                confirm-button-text="我意已决"
                cancel-button-text="只是手抖"
                confirm-button-type="danger"
                icon="el-icon-info"
                icon-color="red"
                title="确定要删除吗？"
                @onConfirm="confirm(scope.$index, scope.row)"
              >
                <el-button slot="reference" type="danger" :size="size" plain>删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { menuIndex, menuDelete } from '@/api/menu'

export default {
  name: 'Index',
  computed: {
    ...mapGetters([
      'size'
    ])
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  methods: {
    getData() {
      this.loading = true
      menuIndex().then(resp => {
        const { data } = resp
        this.tableData = data
        this.loading = false
      })
    },
    edit(scopeIndex, scopeRow) {
      this.$router.push({ path: '/menu/edit', query: { id: scopeRow.id }})
    },
    confirm(index, rows) {
      this.loading = true
      menuDelete({ id: rows.id })
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

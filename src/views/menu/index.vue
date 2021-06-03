<template>
  <div>
    <div class="view-container">

      <table-data
        :loading="loading"
        :data="tableData"
        pathname="menu"
        @search="getData"
      >

        <el-table-column align="left" prop="title" label="菜单名" />

        <el-table-column align="center" prop="id" width="80" label="ID" />

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
            <el-switch v-model="scope.row.hidden == '1'" @change="chgHidden(scope.row.id, scope.row.hidden)" />
          </template>
        </el-table-column>

        <el-table-column width="80" align="center" prop="noCache" label="是否缓存">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.noCache == '0'" @change="chgCache(scope.row.id, scope.row.noCache)" />
          </template>
        </el-table-column>

        <!--<el-table-column width="80" align="center" prop="isshow" label="是否显示在面包屑">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.breadcrumb == '1'">
            </el-switch>
          </template>
        </el-table-column>-->

        <el-table-column width="80" align="center" prop="sort" label="排序" />
      </table-data>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableData from '@/components/TableData/info'
import { menuIndex,menuEdit } from '@/api/menu'
import checkPermission from '@/utils/permission'

export default {
  name: 'menuindex',
  components: {
    TableData
  },
  computed: {
    ...mapGetters(['size'])
  },
  // 菜单列表没有按钮主动搜索，每次切换回来就更新一次数据
  activated() {
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
      menuIndex()
        .then(({code, msg, data}) => {
          if (!code)
          {
            return this.$message.error(msg)
          }
          this.tableData = data
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    chgCache(id, val) {
      this.sendChange({id: id, noCache: val == 1 ? 0 : 1})
    },
    chgHidden(id, val) {
      this.sendChange({id: id, hidden: val == 1 ? 0 : 1})
    },
    sendChange(data) {
      if (!checkPermission(['admin', '/menu/edit']))
      {
        this.$confirm('对不起，没有权限', {
          type: 'error',
          showClose: false,
          showCancelButton: false
        }).catch(error => {})
      } else {
        this.loading = true
        menuEdit('post', data)
        .then(({code, msg}) => {
          if (code) {
            this.$message.success('操作成功')
            this.getData()
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

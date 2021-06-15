<template>
  <div>
    <div class="view-container">

      <table-data
        :loading="loading"
        :data="tableData"
        pathname="menu"
        @search="search"
      >

        <el-table-column align="left" prop="title" label="菜单名" />

        <el-table-column align="center" prop="id" width="80" label="ID" />

        <el-table-column prop="icon" align="center" label="图标" width="80">
          <template slot-scope="scope">
            <item :icon="scope.row.icon"></item>
          </template>
        </el-table-column>

        <el-table-column align="left" prop="name" label="name" />

        <el-table-column prop="path" label="path" />

        <el-table-column prop="redirect" label="重定向" />

        <el-table-column prop="component" label="组件" />

        <el-table-column width="80" align="center" prop="sort" label="排序" />

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

        <el-table-column width="80" align="center" prop="affix" label="是否固定在标签页">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.affix == '1'" @change="chgAffix(scope.row.id, scope.row.affix)" />
          </template>
        </el-table-column>

        <el-table-column width="80" align="center" prop="breadcrumb" label="是否显示在面包屑">
          <template slot-scope="scope">
            <!--top一级菜单不会注册路由，自然不会显示在面包屑中-->
            <el-switch v-model="scope.row.pid != 0 && scope.row.breadcrumb == '1'" @change="chgBreadcrumb(scope.row.id, scope.row.breadcrumb)" />
          </template>
        </el-table-column>

      </table-data>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableData from '@/components/TableData/info'
import { menuIndex,menuEdit } from '@/api/menu'
import checkPermission from '@/utils/permission'
import Item from '@/layout/components/Sidebar/Item'

export default {
  name: 'menuindex',
  components: {
    TableData,
    Item
  },
  computed: {
    ...mapGetters(['size'])
  },
  // 菜单列表没有按钮主动搜索，每次切换回来就更新一次数据
  activated() {
    this.search()
  },
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  methods: {
    search() {
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
    chgBreadcrumb(id, val) {
      this.sendChange({id: id, breadcrumb: val == 1 ? 0 : 1})
    },
    chgAffix(id, val) {
      this.sendChange({id: id, affix: val == 1 ? 0 : 1})
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

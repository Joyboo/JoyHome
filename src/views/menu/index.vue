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
      </table-data>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableData from '@/components/TableData/info'
import { menuIndex } from '@/api/menu'

export default {
  name: 'Index',
  components: {
    TableData
  },
  computed: {
    ...mapGetters(['size'])
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
      menuIndex()
        .then(resp => {
          const { data } = resp
          this.tableData = data
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
  .el-button {
    margin: 0 2px;
  }
</style>

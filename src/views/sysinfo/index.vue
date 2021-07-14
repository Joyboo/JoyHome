<template>
  <div class="view-container">
    <el-tabs type="border-card">
      <el-tab-pane v-for="(item, key) in sysgrp" :key="key" :label="item">
        <el-table
          v-loading="loading"
          :data="tableData[key]"
          row-key="id"
          :size="size"
          border
          lazy
        >
          <el-table-column align="center" prop="var" width="150" label="变量名" />

          <el-table-column align="left" label="值">
            <template slot-scope="scope">
              <span v-html="scope.row.value" />
            </template>
          </el-table-column>

          <el-table-column align="center" width="300" label="说明">
            <template slot-scope="scope">
              {{ scope.row.extension.comment }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="100" label="类型">
            <template slot-scope="scope">
              {{ scope.row.extension.type }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="200" label="操作">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sysinfoIndex, sysinfoDel } from '@/api/sysinfo'

export default {
  name: 'sysinfoindex',
  data() {
    return {
      loading: false,
      sysgrp: {},
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  activated() {
    this.search()
  },
  methods: {
    search() {
      this.loading = true
      sysinfoIndex()
        .then(resp => {
          const { sysgrp, data } = resp.data
          this.sysgrp = sysgrp
          this.tableData = data
        })
        .finally(() => {
          this.loading = false
        })
    },
    confirmDelete(index, row) {
      this.loading = true
      sysinfoDel({ id: row.id })
        .then(resp => {
          const { code, msg } = resp
          if (code) {
            this.$message.success(msg)
            this.getData()
          } else {
            this.$message.error(msg || 'Error')
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    edit(index, row) {
      this.$router.push({ path: '/sysinfo/edit', query: { id: row.id }})
    }
  }
}
</script>

<style scoped>
  .el-button {
    margin: 0 2px;
  }
</style>

<template>
  <div v-if="errorLogs.length > 0">
    <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;" @click.native="dialogTableVisible = true">
      <el-button style="padding: 8px 10px;" size="small" type="danger">
        <!-- 上报中，转圈圈 -->
        <i v-if="reporting" class="el-icon-loading" />
        <svg-icon v-else icon-class="bug" />
      </el-button>
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" width="80%" append-to-body>
      <div slot="title">
        <span class="danger">有错误产生哦，已自动上报服务器
        </span>

        <el-button size="mini" style="float: right;margin-right: 100px;" type="primary" icon="el-icon-delete" @click="clearAll">清除</el-button>
      </div>
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template slot-scope="{row}">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Tag: </span>
              <el-tag type="warning">
                {{ row.vm.$vnode.tag }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <el-tag type="warning">
                {{ row.info }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template slot-scope="scope">
            <span class="danger">{{ scope.row.err.stack }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ErrorLog',
  data() {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    },
    reporting() {
      return this.$store.state.errorLog.reporting
    }
  },
  watch: {
    dialogTableVisible: function(newVal) {
      if (newVal) {
        this.$store.dispatch('errorLog/doreport')
      }
    }
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false
      this.$store.dispatch('errorLog/clearErrorLog')
    }
  }
}
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>

<template>
  <el-dialog v-loading="loading" title="请输入平台回调数据" :visible.sync="showdialog" width="50%" center @open="search">
    <json-editor :value="form.content" @changed="changed" />

    <br>
    <br>

    <el-form :size="size" :inline="true">
      <el-form-item label="是否通知CP发货">
        <el-radio-group v-model="form.ignorecp">
          <el-radio label="" border>是</el-radio>
          <el-radio label="IgnoreCp" border>否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否忽略第三方平台验签" style="float: right;">
        <el-radio-group v-model="form.ignoresn">
          <el-radio label="" border>否</el-radio>
          <el-radio label="IgnoreSn" border>是</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button :size="size" @click="showdialog = false">取 消</el-button>
      <el-button :size="size" type="primary" @click="doRepair">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
import { callBackOrder, repairOrder } from '@/api/order'
import { mapGetters } from 'vuex'

export default {
  components: {
    JsonEditor
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      form: {
        content: {},
        ignorecp: '', // 不通知CP发货
        ignoresn: 'IgnoreSn' // 忽略第三方平台验签
      }
    }
  },
  computed: {
    ...mapGetters(['size']),
    showdialog: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('update:dialog', val)
      }
    }
  },
  methods: {
    search() {
      this.loading = true
      callBackOrder(this.query)
        .then(({ code, msg, data }) => {
          if (!code) {
            this.$message.error(msg)
          } else {
            this.$set(this.form, 'content', data)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    changed(content) {
      this.$set(this.form, 'content', content)
    },
    doRepair() {
      this.$confirm('确定要补单吗？')
        .then(_ => {
          this.loading = true
          const data = this.form
          data.pf = this.query.pf
          data.gameid = this.query.gameid
          data.ProxyRegion = this.query.ProxyRegion

          if (typeof data.content == 'string') {
            data.content = JSON.parse(data.content)
          }

          repairOrder(data)
            .then(({ code, msg }) => {
              if (!code) {
                this.$message.error('操作失败: ' + msg)
              } else {
                this.$message.success('操作成功: ' + msg)
                this.showdialog = false
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
            .finally(() => {
              this.loading = false
            })
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>

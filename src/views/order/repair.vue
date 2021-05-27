<template>
  <el-dialog title="请输入平台回调数据" :visible.sync="showdialog" width="50%" center @open="search" v-loading="loading">
    <json-editor :value="form.content"></json-editor>

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
      <el-button @click="showdialog = false">取 消</el-button>
      <el-button type="primary" @click="doRepair">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import JsonEditor from '@/components/JsonEditor'
  import {callBackOrder, repairOrder} from "@/api/order";
  import {mapGetters} from "vuex";

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
        default: {}
      }
    },
    computed: {
      ...mapGetters(['size']),
      showdialog: {
        get() {
          return this.dialog
        },
        set(val) {
          this.$emit('setRepairDialog', val)
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
    methods: {
      search() {
        this.loading = true
        callBackOrder(this.query)
          .then(resp => {
            const {code, msg, data} = resp
            if (!code)
            {
              this.$message.error(msg)
            } else {
              this.form.content = data
            }
          })
          .finally(() => {
            this.loading = false
          })
      },
      doRepair() {
        this.$confirm('确定要补单吗？')
          .then(_ => {
            this.loading = true
            let data = this.form
            data.pf = this.query.pf
            data.gameid = this.query.gameid
            data.ProxyRegion = this.query.ProxyRegion

            repairOrder(data)
              .then(resp => {
                const {code, msg, data} = resp
                if (!code)
                {
                  this.$message.error('操作失败: ' + msg)
                } else {
                  this.$message.success('操作成功: ' + msg)
                }
              })
              .catch(error => {
                this.$message.error(error)
              })
              .finally(() => {
                this.loading = false
              })
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <el-dropdown v-if="isshow" trigger="click" :size="size" @command="selectExport">
    <div>
      <el-button icon="el-icon-download" type="primary" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="1">
        导出当前页
      </el-dropdown-item>
      <el-dropdown-item command="2">
        导出全部页
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { export_table_to_excel_joyboo } from '@/vendor/Export2Excel'
import { getToken } from '@/utils/auth'
import { queryParams } from '@/utils'

export default {
  props: {
    /* 导出当前页参数 */
    tabid: {
      type: String,
      default: 'listTable'
    },

    /* 导出全部页参数 */
    query: {
      type: Object,
      default() {
        return {}
      }
    },
    exportUrl: {
      type: String,
      default: ''
    },
    filename: {
      type: String,
      default: 'listTable'
    },
    bookType: {
      type: String,
      default: 'xlsx'
    },
    // 是否显示，在手机端默认是不显示导出按钮的
    forceview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['size', 'device']),
    isshow() {
      if (this.device === 'mobile') {
        return !!this.forceview
      }
      return true
    }
  },
  methods: {
    selectExport(val) {
      // 当前页
      if (val == 1) {
        export_table_to_excel_joyboo({
          id: this.tabid,
          bookType: this.bookType,
          filename: this.filename
        })
      } else if (val == 2) {
        // 全部页
        const token = getToken()
        let url = process.env.VUE_APP_BASE_API + '/admin' + this.exportUrl + '?_token=' + token + '&'
        url += queryParams(this.query)
        window.open(url)

        /*
          // 这是一个msgbox传入Vue组件的例子
          const h = this.$createElement;
          // add a unique for VNode
          this.$msgbox({
            title: '导出中 .. ',
            showClose: false,  // MessageBox 是否显示右上角关闭按钮
            closeOnPressEscape: false, // 是否可通过按下 ESC 键关闭 MessageBox
            closeOnClickModal: false, // 是否可通过点击遮罩关闭 MessageBox
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: '取消导出',
            message: h('el-progress', {
              key: this.key,
              props: {
                "stroke-width": 15,
                percentage: this.progress.num
              }
            })
          })
          .then(resp => {
            console.log(resp)
          })
          .catch(() => {
            // 取消导出
            console.log('取消')
          })

          * */
      }
    }
  }
}
</script>

<style scoped>

</style>

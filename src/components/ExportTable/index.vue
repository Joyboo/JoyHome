<template>
  <el-collapse-transition>
    <el-form v-show="showExport" :size="size" :inline="true">

      <el-form-item>
        <el-input v-model="filename" placeholder="导出文件名" clearable></el-input>
      </el-form-item>

      <!--<el-form-item label="单元格自动宽度">
        <el-radio-group v-model="autoWidth">
          <el-radio :label="true" border>
            是
          </el-radio>
          <el-radio :label="false" border>
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>-->

      <el-form-item>
        <el-select v-model="bookType" style="width: 100px">
          <el-option
            v-for="item in elist"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="success" icon="el-icon-download" @click="exportCurrPage">导出当前页</el-button>
      </el-form-item>

      <el-form-item v-if="showAll">
        <el-button type="warning" icon="el-icon-download">导出全部页</el-button>
      </el-form-item>

    </el-form>
  </el-collapse-transition>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "ExportTable",
    computed: {
      ...mapGetters(['size'])
    },
    props: {
      // 传递的表头字段及中文显示,{date: "日期", name: "Joyboo"}
      /*header: {
        required: true,
        type: Object
      },*/
      // 控制导出行显示
      showExport: {
        type: Boolean,
        default: false
      },
      // 是否显示导出全部
      showAll: {
        type: Boolean,
        default: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bookType: 'xlsx', // 导出类型
        elist: ['xlsx', 'csv', 'txt'],
        filename: '',
        autoWidth: true
      }
    },
    methods: {
      // 导出当前页
      exportCurrPage() {
        this.loading = true
        import('@/vendor/Export2Excel').then(excel => {
          const data = this.exportData()
          excel.export_json_to_excel({
            // header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.loading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>

<style scoped>

</style>

<template>
    <el-button type="warning" icon="el-icon-download" clearable @click="exportExcel">导出</el-button>
</template>

<script>
  /**
   *@author Joyboo 2021-05-24
   *@Document file-saver https://github.com/eligrey/FileSaver.js
   *@Document xlsx https://github.com/SheetJS/sheetjs
   */

  // import FileSaver from "file-saver";
  // import XLSX from "xlsx";
  import {export_table_to_excel_joyboo} from '@/vendor/Export2Excel'

  export default {
    name: 'ExportExcel',
    props: {
      // table元素id
      tabid: {
        type: String,
        default: 'listTable'
      },
      // 导出文件名
      filename: {
        type: String,
        default: 'listTable'
      },
      bookType: {
        type: String,
        default: 'xlsx'
      }
    },
    computed: {
      fname() {
        return this.filename + '.' + this.bookType
      }
    },
    methods: {
      exportExcel() {
        // todo 解决内存溢出的原因
        /*export_table_to_excel({
          id: this.tabid,
          bookType: this.bookType,
          type: 'array',
          filename: this.filename
        })*/

        export_table_to_excel_joyboo({
          id: this.tabid,
          bookType: this.bookType,
          filename: this.filename
        })
      }
    }
  }
</script>

<style scoped>

</style>

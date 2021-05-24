<template>
    <el-button type="warning" icon="el-icon-download" clearable @click="exportExcel">导出</el-button>
</template>

<script>
  /**
   *@author Joyboo 2021-05-24
   *@Document file-saver https://github.com/eligrey/FileSaver.js
   *@Document xlsx https://github.com/SheetJS/sheetjs
   */

  import FileSaver from "file-saver";
  import XLSX from "xlsx";

  export default {
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
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector('#' + this.tabid), {raw:true});
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
          bookType: this.bookType,
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            this.fname
          );
        } catch (e) {
          console.log(e, wbout)
        }
        return wbout;
      }
    }
  }
</script>

<style scoped>

</style>

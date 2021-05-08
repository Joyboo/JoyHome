<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="sizes"
      :page-size="pagesize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: ['total', 'currentpage', 'pagesize'],
    data() {
      return {
        sizes: [20, 100, 200, 300, 500, 1000]
      }
    },
    methods: {
      // 改变每页大小
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val)
      },
      // 点击页码
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    float: right;
    margin: 10px;
  }
</style>

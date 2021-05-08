<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="sizes"
      :page-size="pagesize"
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
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val)
      },
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

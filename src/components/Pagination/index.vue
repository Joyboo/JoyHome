<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },

    // 查询参数
    query: {
      type: Object,
      default() {
        return {}
      }
    },

    pageSizes: {
      type: Array,
      default() {
        return [20, 100, 200, 300, 500, 1000]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.query.cPage
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.query.pSize
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }

      this.query.cPage = this.currentPage
      this.query.pSize = val
      this.$emit('search')
    },
    handleCurrentChange(val) {
      // this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }

      this.query.cPage = val
      this.query.pSize = this.pageSize
      this.$emit('search')
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 5px 16px;
  float: right;
  margin: 10px;

}
.pagination-container.hidden {
  display: none;
}
</style>

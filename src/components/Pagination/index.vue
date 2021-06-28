<template>
  <div :class="{'hidden':hidden, pagerMobile: isMobile}" class="pagination-container">
    <el-scrollbar :vertical="false" class="scroll-container">
      <el-pagination
        :background="background"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :layout="layout"
        :page-sizes="sizelist"
        :pager-count="isMobile ? 5 : 7"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-scrollbar>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
import {isArray} from "@/utils/validate";
import {mapGetters} from "vuex";

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    // 查询参数,必传
    query: {
      required: true,
      type: Object
    },
    // list_rows列表页， cnt_rows统计页
    row: {
      type: String,
      default: 'list_rows'
    },

    pageSizes: {
      type: Array,
      default() {
        return []
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
    ...mapGetters(['config', 'device']),
    isMobile() {
      return this.device === 'mobile'
    },
    sizelist() {
      if (this.pageSizes.length > 0)
      {
        return this.pageSizes;
      }
      return this.config.paginate.sizelist || []
    },
    currentPage: {
      get() {
        if (typeof this.query[this.cPageKey] != 'undefined')
        {
          return this.query[this.cPageKey]
        }
        return 1
      },
      set(val) {
        // this.$emit('update:page', val)
        this.$set(this.query, this.cPageKey, val)
      }
    },
    pageSize: {
      get() {
        // Props传值
        if (typeof this.query[this.pSizeKey] != 'undefined')
        {
          return this.query[this.pSizeKey]
        }
        // 后台配置,列表页
        else if (typeof this.config.paginate[this.row] != 'undefined')
        {
          return this.config.paginate[this.row]
        }
        // 第一个值
        else if (isArray(this.sizelist) && this.sizelist.length > 0)
        {
          return this.sizelist[0]
        }
        else {
          return 20
        }
      },
      set(val) {
        // this.$emit('update:limit', val)
        this.$set(this.query, this.pSizeKey, val)
      }
    },
    // 分页key
    cPageKey() {
      return this.$store.state.config.cPageKey
    },
    pSizeKey() {
      return this.$store.state.config.pSizeKey
    },
  },
  // 全局config为异步获取，需要侦听器
  watch: {
    cPageKey: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal) {
          this.$set(this.query, newVal, this.currentPage)
        }
      }
    },
    pSizeKey: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal) {
          this.$set(this.query, newVal, this.pageSize)
        }
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }

      this.pageSize = val
      this.$emit('search')
    },
    handleCurrentChange(val) {
      // this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }

      this.currentPage = val
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination-container {
    background: #fff;
    padding: 5px 16px;
    float: right;
    margin: 10px;
    /*width: 100%;*/
  }

  .pagination-container.hidden {
    display: none;
  }

  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    ::v-deep {
      .el-scrollbar__bar {
        bottom: 0px;
      }
      .el-scrollbar__wrap {
        height: 49px;
      }
    }
  }

  // 移动端加上width:100%才能横向滚动，PC端加了后会导致float:right失效，整个分页组件会跑到左边
  .pagerMobile {
    width: 100%;
  }
</style>

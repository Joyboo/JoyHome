<template>
  <el-table
    v-loading="load"
    :data="data"
    row-key="id"
    :size="size"
    :height="height"
    :expand-row-keys="expandRowKeys"
    border
    lazy
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    @cell-mouse-enter="cellMouseEnter"
    @cell-mouse-leave="cellMouseLeave"
    @row-click="rowClickEvent"
  >

    <!--表格插槽-->
    <slot />

    <el-table-column align="center" label="操作" :width="btnWidth">
      <template slot-scope="scope">

        <!--按钮插槽-->
        <slot name="btn" :index="scope.$index" :row="scope.row" />

        <el-button
          v-if="checkPermission(['admin', '/' + pathname + '/edit'])"
          type="primary"
          :size="size"
          plain
          @click="edit(scope.$index, scope.row)"
        >
          编辑
        </el-button>

        <el-popconfirm
          v-if="checkPermission(['admin', '/' + pathname + '/del'])"
          confirm-button-text="我意已决"
          cancel-button-text="只是手抖"
          confirm-button-type="danger"
          icon="el-icon-info"
          icon-color="red"
          title="确定要删除吗？"
          @onConfirm="confirmDelete(scope.$index, scope.row)"
        >
          <el-button slot="reference" type="danger" :size="size" plain>删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>

  </el-table>

</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import checkPermission from '@/utils/permission'
import { calcHeight } from '@/utils'

export default {
  name: 'TableInfo',
  components: {
    // Pagination
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // 父组件名称
    pathname: {
      required: true,
      type: String
    },
    // 操作栏宽度
    btnWidth: {
      type: Number,
      default: 180
    },
    // 展开行
    expandRowKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      height: 0
    }
  },
  computed: {
    ...mapGetters(['size']),
    load: {
      get() {
        return this.loading
      },
      set(val) {
        this.$emit('update:loading', val)
      }
    }
  },
  mounted() {
    setTimeout(this.autoSetHeight, 0)
    // 监听全屏切换
    // screenfull.on('change', autoSetHeight);
    // 监听视口变化
    window.addEventListener('resize', this.autoSetHeight)
    // 监听Bus
    this.$bus.$on('setHeight', this.autoSetHeight)
  },
  beforeDestroy() {
    this.$bus.$off('setHeight')
    window.removeEventListener('resize', this.autoSetHeight)
  },
  methods: {
    checkPermission,
    autoSetHeight() {
      //  全屏 - Header - 搜索栏 | 全屏 - el-table起始高度
      const el = window.document.getElementsByClassName('el-table')
      if (el.length > 0) {
        let offsetTop = el[0].getBoundingClientRect().top

        // 如果需要分页，再加分页高度
        const elPage = window.document.getElementsByClassName('pagination-container')
        if (elPage.length > 0) {
          offsetTop += elPage[0].getBoundingClientRect().height
        }
        // +20是为了给padding留位置,否则会出现滚动条
        offsetTop += 20

        this.height = calcHeight(offsetTop)
      } else {
        this.height = calcHeight(220)
      }
    },
    // 编辑
    edit(index, row) {
      const path = '/' + this.pathname + '/edit'
      this.$router.push({ path: path, query: { id: row.id }})
    },
    // 确定删除
    confirmDelete(index, rows) {
      this.load = true
      const url = '/admin/' + this.pathname + '/del'
      request({
        url: url,
        method: 'get',
        params: { id: rows.id }
      })
        .then(({ code, msg }) => {
          this.load = false
          if (code) {
            this.$message.success('操作成功')
            this.$emit('search')
          }
        })
        .catch(error => {
          this.load = false
          console.error(error)
          this.$message.error('操作失败')
        })
    },
    // 当单元格 hover 进入时会触发该事件
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cellMouseEnter', row, column, cell, event)
    },
    // 当单元格 hover 退出时会触发该事件
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cellMouseLeave', row, column, cell, event)
    },
    // 当某一行被点击时会触发该事件
    rowClickEvent(row, column, event) {
      this.$emit('rowClickEvent', row, column, event)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    margin: 0 2px;
  }
</style>

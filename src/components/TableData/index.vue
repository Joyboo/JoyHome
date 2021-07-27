<template>
  <el-table
    :id="tabid"
    ref="listTable"
    v-loading="load"
    :data="data"
    :border="border"
    :size="size"
    :height="height"
    :summary-method="getSummaries"
    :show-summary="heji"
  >

    <slot name="header" />

    <!--
        column字段说明：
        {
          key: '',
          text: 表头文本
          tip: 鼠标指到表头才出现的提示
          width: 表格宽
          fixed: 是否固定该列
          align: 同时作用于表头和表格，center|left|right
          template: function类型，作用于表格项，返回应该为一个字符串，支持html字符串
          click: function类型，作用于表格项,点击后执行的函数

        }
        -->

    <el-table-column
      v-for="(item, key) in column"
      :key="key"
      :width="item.width"
      :sortable="item.sort"
      :fixed="item.fixed"
      :align="item.align || 'center'"
      :prop="item.key"
    >

      <!--表格槽-->
      <template slot-scope="scope">

        <span
          v-if="typeof item.template == 'function'"
          @click="typeof item.click == 'function' ? item.click(scope.row[item.key], scope.row) : ''"
          v-html="item.template(scope.row[item.key], scope.row)"
        />

        <!--json数据显示,注意需要设置el-table-column的align=left,否则很难看-->
        <span v-else-if="typeof scope.row[item.key] === 'object'">
          <json-viewer
            :value="scope.row[item.key]"
            :expand-depth="0"
            copyable
            :boxed="false"
            sort
          />
        </span>
        <!--如需多级key，如extension.joyboo,请传递template实现-->
        <span v-else @click="typeof item.click == 'function' ? item.click(scope.row[item.key], scope.row) : ''">{{ scope.row[item.key] }}</span>

      </template>

      <!--表头槽-->
      <template slot="header">
        <el-tooltip v-if="typeof item.tip != 'undefined'" class="item" effect="dark" :content="item.tip" placement="top">
          <span>{{ item.text }}</span>
        </el-tooltip>
        <span v-else>{{ item.text }}</span>
      </template>

    </el-table-column>

    <slot />

  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'
import JsonViewer from 'vue-json-viewer'
// import screenfull from 'screenfull'
import { calcHeight } from '@/utils'

export default {
  name: 'TableIndex',
  components: {
    JsonViewer
  },
  props: {
    column: {
      required: true,
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      required: true,
      type: Array
    },
    // 是否需要合计行
    heji: {
      type: Boolean,
      default: false
    },

    // id
    tabid: {
      type: String,
      default: 'listTable'
    },
    // 纵向边框
    border: {
      type: Boolean,
      default: true
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
    // 按当前视口自动计算表格高度
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
    // todo  暂时只有一行能固定
    getSummaries(param) {
      const { columns, data } = param
      const sums = []; let joy = [] // 合计行数据

      data.forEach((column, index) => {
        if (typeof column.h != 'undefined') {
          joy = column
          return
        }
      })

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = joy.h == '--' ? '页合计1' : (joy.h == '-' ? '总合计' : '')
        } else {
          // *100 /100 保存两位小数
          sums[index] = parseInt(joy[column.property] * 100) / 100 || ''
        }
      })

      // 重新布局，以修复偶尔合计行不显示的问题
      this.$nextTick(() => {
        this.$refs.listTable.doLayout()
      })

      // console.log(sums)
      return sums
    }
  }
}
</script>

<style scoped>
  /*.el-table{
    overflow:visible !important;
  }*/
</style>

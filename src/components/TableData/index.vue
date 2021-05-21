<template>
  <el-table
    ref="listTable"
    v-loading="loading"
    :data="data"
    border
    :size="size"
    :height="height"
    :summary-method="getSummaries"
    :show-summary="heji"
  >

    <el-table-column v-for="(item, key) in column" :width="item.width" :key="key" :sortable="item.sort"
                     :align="item.align || 'center'" :prop="item.key">

      <!--表格槽-->
      <template slot-scope="scope">
        <span v-if="typeof item.template == 'function'" >
          {{item.template(scope.row[item.key], scope.row)}}
        </span>
        <!--json数据显示,注意需要设置el-table-column的align=left,否则很难看-->
        <span v-else-if="typeof scope.row[item.key] === 'object'">
          <json-viewer
            :value="scope.row[item.key]"
            :expand-depth=0
            copyable
            :boxed="false"
            sort></json-viewer>
        </span>
        <span v-else>{{scope.row[item.key]}}</span>

      </template>

      <!--表头槽-->
      <template slot="header" slot-scope="scope">
        <el-tooltip v-if="typeof item.tip != 'undefined'" class="item" effect="dark" :content="item.tip" placement="top">
          <span>{{item.text}}</span>
        </el-tooltip>
        <span v-else>{{item.text}}</span>
      </template>

    </el-table-column>

    <slot></slot>

  </el-table>
</template>

<script>
  import {mapGetters} from "vuex";
  import JsonViewer from 'vue-json-viewer'

  export default {
    name: "TableIndex",
    components: {
      JsonViewer
    },
    computed: {
      ...mapGetters(['size'])
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
      // 表格高度
      height: {
        type: Number,
        default: 700
      }
    },
    methods: {
      // todo  暂时只有一行能固定
      getSummaries(param) {
        const { columns, data } = param;
        let sums = [], joy = []; // 合计行数据

        data.forEach((column, index) => {
          if (typeof column.h != 'undefined') {
            joy = column;
            return;
          }
        })

        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = joy.h == '--' ? '页合计' : (joy.h == '-' ? '总合计' : '');
          } else {
            sums[index] = joy[column.property] || ''
          }
        })

        // 重新布局，以修复偶尔合计行不显示的问题
        this.$nextTick(() => {
          this.$refs.listTable.doLayout();
        });

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

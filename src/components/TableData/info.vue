<template>
    <el-table
      v-loading="load"
      :data="data"
      row-key="id"
      :size="size"
      :height="height"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >

      <!--表格插槽-->
      <slot></slot>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">

          <!--按钮插槽-->
          <slot name="btn" :index="scope.$index" :row="scope.row"></slot>

          <el-button type="primary"
                     v-if="checkPermission(['admin', '/' + pathname + '/edit'])"
                     :size="size" plain @click="edit(scope.$index, scope.row)">
            编辑
          </el-button>

          <el-popconfirm
            confirm-button-text="我意已决"
            cancel-button-text="只是手抖"
            confirm-button-type="danger"
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除吗？"
            v-if="checkPermission(['admin', '/' + pathname + '/del'])"
            @onConfirm="confirmDelete(scope.$index, scope.row)"
          >
            <el-button slot="reference" type="danger" :size="size" plain>删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>


</template>

<script>
  import {mapGetters} from "vuex";
  import request from "@/utils/request";
  import checkPermission from '@/utils/permission'

  export default {
    name: "TableInfo",
    computed: {
      ...mapGetters(['size']),
      load: {
        get() {
          return this.loading
        },
        set(val) {
          this.$emit('setloading', val)
        }
      }
    },
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
        default: []
      },
      // 父组件名称
      pathname: {
        required: true,
        type: String
      },
      height: {
        type: Number,
        default() {
          // 默认是算上了分页组件高度的，如果该页不需要分页，实际应该 -170左右
          const h = window.document.documentElement.clientHeight || 900
          return h - 220
        }
      }
    },
    methods: {
      checkPermission,
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
          .then(({code, msg}) => {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-button {
    margin: 0 2px;
  }
</style>

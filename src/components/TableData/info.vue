<template>
    <el-table
      v-loading="load"
      :data="data"
      row-key="id"
      :size="size"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >

      <!--表格插槽-->
      <slot></slot>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">

          <!--按钮插槽-->
          <slot name="btn"></slot>

          <el-button type="primary" :size="size" plain @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm
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
  import {mapGetters} from "vuex";
  // import Pagination from '@/components/Pagination'
  import request from "@/utils/request";

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
      }
    },
    methods: {
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
          .then(resp => {
            this.load = false
            if (resp.code) {
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

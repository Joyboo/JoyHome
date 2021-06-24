<template>

  <div class="view-container">
    <layout-filter :query="query" @search="search" :loading="loading">
      <template>
        <el-form-item>
          <el-select v-model="query.type" clearable placeholder="操作类型">
            <el-option
              v-for="item in typelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input type="text" v-model="query.content" placeholder="SQL关键字" clearable @change="search" />
        </el-form-item>
      </template>
    </layout-filter>

    <table-index :data="tableData" :loading="loading" :column="column" :border="false"></table-index>

    <pagination :total="total" :query="query" @search="search" />
  </div>

</template>

<script>
  import {mapGetters} from "vuex";
  import Pagination from '@/components/Pagination'
  import LayoutFilter from '@/components/LayoutFilter'
  import TableIndex from '@/components/TableData'
  import {logIndex} from "@/api/log";

  export default {
    name: "adminlogindex",
    components: {
      Pagination,
      LayoutFilter,
      TableIndex
    },
    computed: {
      ...mapGetters(['size'])
    },
    data() {
      return {
        loading: false,
        query: {
          begintime: true,
          endtime: true,
          type: '',
          content: ''
        },

        typelist: [
          {
            label: '新增',
            value: 'insert'
          }, {
            label: '更新',
            value: 'update'
          }, {
            label: '删除',
            value: 'delete'
          }
        ],
        total: 0,
        tableData: [],
        column: [
          {
            key: 'id',
            text: 'ID',
            width: 100,
            sort: true
          },
          {
            key: 'admname',
            text: '管理员',
            width: 100
          },
          {
            key: 'admid',
            text: '管理员ID',
            width: 80
          },
          {
            key: 'itime',
            text: '操作时间',
            sort: true,
            width: 120
          },
          {
            key: 'ip',
            text: 'ip',
            width: 120
          },
          {
            key: 'content',
            text: 'SQL',
          }
        ]
      }
    },
    methods: {
      search() {
        this.loading = true
        logIndex(this.query)
          .then(({code, msg, data}) => {
            if (!code)
            {
              return this.$message.error(msg)
            }

            this.tableData = data.data || []
            this.total = data.totals || 0
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>

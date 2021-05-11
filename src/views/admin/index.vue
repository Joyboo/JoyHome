<template>
  <div class="view-container">

    <el-form :model="query" :size="size" :inline="true">
      <el-form-item>
        <el-select v-model="query.rid" filterable placeholder="--所属组--" >
          <el-option
            v-for="item in rolelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="query.keyword" clearable placeholder="姓名或手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-select v-model="query.deltime" filterable placeholder="状态" >
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="锁定" value="2"></el-option>
          <el-option label="已删除" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search">查询
        </el-button>
      </el-form-item>

    </el-form>

    <table-data
      :loading="loading"
      :data="data"
      pathname="admin"
      @search="search"
    >

      <el-table-column sortable align="center" prop="id" label="ID" width="80" />
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" prop="realname" label="真实姓名" />

      <el-table-column align="center" label="角色组">
        <template slot-scope="scope">
          {{rlist[scope.row.rid]}}
        </template>
      </el-table-column>

      <el-table-column sortable align="center" prop="sort">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="越小越靠前" placement="top">
            <span>排序</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <template v-if="scope.row.deltime > 0">
            <el-tag type="danger">已删除</el-tag>
          </template>
          <template v-else-if="scope.row.extension.status == 0">
            <el-tag type="warning">锁定</el-tag>
          </template>
          <template v-else>
            <el-tag type="success">正常</el-tag>
          </template>
        </template>
      </el-table-column>

    </table-data>

    <pagination
      :total="total"
      :limit="query.pSize"
      :page="query.cPage"
      @pagination="pagination"
    />
  </div>
</template>

<script>
  import TableData from '@/components/TableData'
  import Pagination from '@/components/Pagination'
  import {rolelist} from '@/api/role'
  import {adminIndex} from '@/api/admin'
  import {mapGetters} from "vuex";

  export default {
    components: {
      TableData,
      Pagination
    },
    computed: {
      ...mapGetters(['size'])
    },
    mounted() {
      rolelist().then(resp => {
        const {data} = resp
        this.rlist = data

        for(let i in data)
        {
          this.rolelist.push({
            label: data[i],
            value: i
          })
        }
      })
      this.search()
    },
    data() {
      return {
        loading: false,
        rolelist: [],
        rlist: {}, // 未经处理的数据
        query: {
          rid: '',
          keyword: '',
          deltime: '1',
          cPage: 1,
          pSize: 20,
        },
        data: [],
        total: 0
      }
    },
    methods: {
      search() {
        this.loading = true
        adminIndex(this.query)
          .then(resp => {
            const {code, msg, data} = resp
            this.data = data.data
            this.total = data.totals
          })
          .catch(error => {
            this.$message.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      },
      pagination({ page, limit }) {
        this.query.cPage = page
        this.query.pSize = limit
        this.search()
      },
    }
  }
</script>

<style scoped>

</style>

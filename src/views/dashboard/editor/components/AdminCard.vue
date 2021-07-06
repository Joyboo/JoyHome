<template>

  <el-row class="box-card-component">
    <el-col class="box-card-header" :xs="{span: 12}" :sm="{span: 12}" :md="{span: 10}" :lg="{span: 8}" :xl="{span: 8}" style="height:128px;">
      <img :src="avatar">
    </el-col>
    <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 14}" :lg="{span: 16}" :xl="{span: 16}" style="height:128px;">
      <div class="admin-text">
        <b>{{userinfo.realname}}</b>
        &nbsp;&nbsp;&nbsp;
        <b>{{userinfo.username}}</b>
      </div>
    </el-col>
  </el-row>

</template>

<script>
  import { mapGetters } from 'vuex'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: { PanThumb },
    computed: {
      ...mapGetters(['userinfo', 'avatar', 'name'])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          success: 'success',
          pending: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        statisticsData: {
          article_count: 1024,
          pageviews_count: 1024
        }
      }
    }
  }
</script>

<style lang="scss" >
  .box-card-component{
    .el-card__header {
      padding: 0px!important;
    }
  }
</style>
<style lang="scss" scoped>
  .box-card-component {
    .box-card-header {
      position: relative;
      height: 128px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }

    .admin-text {
      font-size: 16px;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
</style>

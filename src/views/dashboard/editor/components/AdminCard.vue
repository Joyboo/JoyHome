<template>

  <el-row class="box-card-component">
    <el-col class="box-card-header" :xs="{span: 12}" :sm="{span: 12}" :md="{span: 11}" :lg="{span: 11}" :xl="{span: 11}" style="height:128px;">
      <magnifier :url="avatar" :width="100" />
    </el-col>
    <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 13}" :lg="{span: 13}" :xl="{span: 13}" style="height:128px;">
      <div class="admin-text">
        <b>{{ userinfo.realname }}</b>
        &nbsp;&nbsp;&nbsp;
        <b>{{ userinfo.username }}</b>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import { mapGetters } from 'vuex'
import Magnifier from 'zx-magnifie'

export default {
  components: {
    Magnifier
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
  },
  computed: {
    ...mapGetters(['userinfo', 'avatar', 'name'])
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

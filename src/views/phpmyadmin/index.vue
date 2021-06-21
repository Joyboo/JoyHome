<template>
  <el-row class="pma">
    <el-col :xs="{span: 15}" :sm="{span: 15}" :md="{span: 15}" :lg="{span: 8}" :xl="{span: 8}"
            style="margin-top: 3rem;"
            v-for="(o, index) in pma" :key="index" :offset="1">
      <el-card :body-style="{ padding: '0px' }">
        <svg-icon style="width: 100%;height: 100%;" icon-class="phpmyadmin" />
        <div style="padding: 14px;">
          <span :class="o.class">{{o.name}}</span>
          <div class="bottom clearfix">
            <span class="time">{{ o.url }}</span>
            <el-link :href="o.url + '?mytoken=' + token" :underline="false" target="_blank" class="tolink">
              <el-button type="text" class="button">{{$t('open')}}</el-button>
            </el-link>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import {getToken} from "@/utils/auth";
  import {mapGetters} from "vuex";

  export default {
    name: "phpmyadminindex",
    computed: {
      ...mapGetters(['config']),
      pma() {
        return this.config.pma
      }
    },
    data() {
      return {
        token: getToken()
      };
    }
  }
</script>

<style lang="scss" scoped>
  .pma {
    padding: 5rem;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .tolink {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

<template>
  <el-row class="pma">
    <el-col :span="8" v-for="(o, index) in pma" :key="index" :offset="1">
      <el-card :body-style="{ padding: '0px' }">
        <svg-icon style="width: 100%;height: 100%;" icon-class="phpmyadmin" />
        <div style="padding: 14px;">
          <span :class="o.class">{{o.name}}</span>
          <div class="bottom clearfix">
            <span class="time">{{ o.url }}</span>
            <el-link :href="o.url + '?token=' + token" :underline="false" target="_blank" class="tolink">
              <el-button type="text" class="button">打开</el-button>
            </el-link>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import {getToken} from "@/utils/auth";

  export default {
    name: "phpmyadminindex",
    data() {
      return {
        token: getToken(),
        pma: [
          {
            name: '正式版',
            class: 'danger',
            url: 'http://omz-pma.wonderlandgame.com:81'
          },
          {
            name: '测试版',
            class: '',
            url: 'http://testpma.ihengkun.com:81'
          }
        ]
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

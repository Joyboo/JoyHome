<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb :image="avatar" style="float: left;line-height: 50px;">
        <!--Your roles:
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>-->
        <span class="pan-info-roles">{{userinfo.realname}}</span>
        <span class="pan-info-roles">{{userinfo.username}}</span>
      </pan-thumb>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
// import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'DashboardEditor',
  components: { PanThumb },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'userinfo'
    ])
  }
}
</script>

<style lang="scss" scoped>

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: calc(100vh - 84px);
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>

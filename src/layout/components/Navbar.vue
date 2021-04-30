<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <el-menu
      ref="refTopMenu"
      class="header-el-menu"
      mode="horizontal"
      background-color="#304156"
      text-color="#FFF"
      active-text-color="#FFF"
      @select="handleSelect"
    >
      <el-menu-item v-for="menu in topmenu" :index="menu.id">
        <i :class="menu.clsname" />{{ menu.name }}</el-menu-item>
    </el-menu>

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.screenfull')" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip :content="$t('navbar.language')" placement="bottom">
          <lang-select class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip :content="$t('navbar.setting')" placement="bottom">
          <div class="right-menu-item hover-effect" @click="rightPanel">
            <i class="el-icon-s-tools" />
          </div>
        </el-tooltip>

        <el-tooltip :content="$t('navbar.user')" placement="bottom">
          <template>
            <el-dropdown class="avatar-container right-menu-item hover-effect" size="medium" trigger="click">
              <div>
                <svg-icon icon-class="user" />
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/profile/index">
                  <el-dropdown-item>
                    {{ $t('navbar.profile') }}
                  </el-dropdown-item>
                </router-link>
                <router-link to="/">
                  <el-dropdown-item>
                    {{ $t('navbar.dashboard') }}
                  </el-dropdown-item>
                </router-link>
                <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                  <el-dropdown-item>
                    {{ $t('navbar.github') }}
                  </el-dropdown-item>
                </a>
                <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                  <el-dropdown-item>Docs</el-dropdown-item>
                </a>
                <el-dropdown-item divided @click.native="logout">
                  <span style="display:block;">{{ $t('navbar.logOut') }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-tooltip>

      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'topmenu'
    ])
  },
  mounted() {
    // add by Joyboo 触发第一个菜单选中事件
    this.$refs.refTopMenu.$children[0].$el.click()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    // add by Joyboo
    rightPanel() {
      this.$store.dispatch('settings/boolSetting', 'rightPanel')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  /* Joyboo */
  .header-el-menu {
    position: initial;
    float: left;
    border-right: 1px solid #000;

    .el-menu-item {
      height: 50px;
      line-height: 50px;
      font-weight: bold;
      border-left: 1px solid #2e363f;
    }
    .is-active {
      background-color: #000!important;
      /*去除选中边框*/
      border-bottom: none!important;
    }
  }

  .hamburger-container {
    line-height: 49px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    /*background-color: #2b2f3a;*/
    border-bottom: 1px solid #ccc;

    &:hover {
      background: rgba(34, 38, 46, .8)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

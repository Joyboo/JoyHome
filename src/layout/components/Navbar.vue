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
      v-if="topMenuMode"
      @select="handleSelect"
    >
      <el-menu-item v-for="(menu, mk) in topmenu" :key="mk" :index="menu.id">
        <item :icon="menu.meta.icon" :title="menu.meta.fulltitle || menu.meta.title"></item>
      </el-menu-item>
    </el-menu>

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>

    <div class="right-menu">
      <template>
        <el-tooltip v-if="!isMobile" :content="$t('navbar.search')" placement="bottom">
          <search id="header-search" class="right-menu-item" />
        </el-tooltip>

        <error-log class="errLog-container right-menu-item hover-effect" />

        <el-tooltip v-if="!isMobile" :content="$t('navbar.screenfull')" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip  v-if="!isMobile" :content="$t('navbar.size')" effect="dark" placement="bottom">
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
            <el-dropdown class="avatar-container right-menu-item hover-effect" :class="{'mb-right-container': isMobile}" size="medium" trigger="click">
              <div>
                <svg-icon icon-class="user" />
              </div>
              <el-dropdown-menu slot="dropdown">

                <router-link to="/">
                  <el-dropdown-item>
                    {{ $t('navbar.dashboard') }}
                  </el-dropdown-item>
                </router-link>

                  <el-dropdown-item :disabled="isdev" >
                    <a href="http://hkgame.ihengkun.com/admin/pub/login?version=0" target="_blank">
                      {{ $t('login.toold') }}
                    </a>
                  </el-dropdown-item>

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
import Item from '@/layout/components/Sidebar/Item'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search,
    Item
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'topmenu'
    ]),
    isdev() {
      return process.env.NODE_ENV === 'development'
    },
    isMobile() {
      return  this.device === 'mobile'
    },
    topMenuMode() {
      return this.$store.state.permission.mode
    }
  },
  mounted() {
    // add by Joyboo
    // console.log("%c [Github] %c https://github.com/PanJiaChen/vue-element-admin/ ", "color:red","")
    // console.log("%c [Doc] %c https://panjiachen.github.io/vue-element-admin-site/#/ ", "color:red","")
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
      this.$store.dispatch('permission/generateRoutes', key)
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
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    /*background-color: #2b2f3a;*/
    /*border-bottom: 1px solid #ccc;*/

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
    }

    .mb-right-container {
      margin-right: 0;
    }
  }
}
</style>

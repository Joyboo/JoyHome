<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ $t('settings.title') }}</h3>

      <div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.tagsView') }}</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.sidebarLogo') }}</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

      <div v-if="lang === 'zh'" class="drawer-item">
        <span>菜单支持拼音搜索</span>
        <el-switch v-model="supportPinyinSearch" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{$t('settings.accordion')}}</span>
        <el-switch v-model="sidebarMode" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{$t('settings.topMenu')}}</span>
        <el-switch v-model="topMenuMode" :disabled="device === 'mobile'" class="drawer-switch" />
      </div>

      <fieldset class="fieldset">
        <legend>&nbsp;&nbsp;{{$t('settings.duration')}}&nbsp;&nbsp;</legend>
        <div class="block">
          <el-slider v-model="duration" :min="1" :max="700" :show-tooltip="false"></el-slider>
        </div>
        <div class="block slider-number">{{duration}}</div>
      </fieldset>

    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import {getSettingsLocalStorage} from '@/utils'
import {mapGetters} from "vuex";

export default {
  components: { ThemePicker },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['device']),
    fixedHeader: {
      get() {
        return this.getMode('fixedHeader')
      },
      set(val) {
        this.setMode('fixedHeader', val)
      }
    },
    tagsView: {
      get() {
        return this.getMode('tagsView')
      },
      set(val) {
        this.setMode('tagsView', val)
      }
    },
    sidebarLogo: {
      get() {
        return this.getMode('sidebarLogo')
      },
      set(val) {
        this.setMode('sidebarLogo', val)
      }
    },
    supportPinyinSearch: {
      get() {
        return this.getMode('supportPinyinSearch')
      },
      set(val) {
        this.setMode('supportPinyinSearch', val)
      }
    },
    lang() {
      return this.$store.getters.language
    },
    sidebarMode: {
      get() {
        return this.getMode('sidebarMode')
      },
      set(val) {
        this.setMode('sidebarMode', val)
      }
    },
    topMenuMode: {
      get() {
        return this.getMode('topMenuMode')
      },
      set(val) {
        this.setMode('topMenuMode', val)
        this.$store.dispatch('permission/setSidebarByMode', val)
      }
    },
    duration: {
      get() {
        return this.getMode('duration')
      },
      set(val) {
        this.setMode('duration', val)
      }
    }
  },
  methods: {
    themeChange(val) {
      this.setMode('theme', val)
    },
    getMode(key) {
      return getSettingsLocalStorage(key)
    },
    setMode(key, val) {
      this.$store.dispatch('settings/changeSetting', {
        key: key,
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }

  .fieldset {
    border: 1px dotted #ccc;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 5px;

    .slider-number {
      text-align: center;
      line-height: 10px;
      font-size: 12px;
    }
  }
}
</style>

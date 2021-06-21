import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import {setSettingsLocalStorage} from '@/utils'

const { showSettings, tagsView, fixedHeader, sidebarLogo, supportPinyinSearch } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  supportPinyinSearch,
  rightPanel: false, // 右侧设置面板开关
  sidebarMode: true, // 菜单是否风琴条模式
  topMenuMode: true // top菜单模式
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
      setSettingsLocalStorage(key, value)
    }
  },
  BOOL_SETTING: (state, key) => {
    if (state.hasOwnProperty(key)) {
      state[key] = !state[key]
    }
  }
}

const actions = {
  // 设置为某一个值
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // 对布尔值取反
  boolSetting({ commit }, key) {
    commit('BOOL_SETTING', key)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


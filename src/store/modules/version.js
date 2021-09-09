import { MessageBox } from 'element-ui'

const storageKey = 'joyboo_client_version'

// 初始值
const _default = false

/**
 * 设置
 * @param version
 */
const setStorage = (version) => {
  if (typeof version !== 'object') {
    console.info('version.js setStorage Error: ', typeof version)
    return
  }

  if (!checkStructure(version)) {
    console.info('version.js setStorage structure Error: ', version)
    return
  }

  const json = JSON.stringify(version)
  window.localStorage.setItem(storageKey, json)
}

/**
 * 获取
 * @returns {[number, null]|[number, Object]}
 */
const getStorage = () => {
  const local = window.localStorage.getItem(storageKey)
  if (typeof local !== 'string') {
    return [1, null]
  }

  const json = JSON.parse(local)
  if (!checkStructure(json)) {
    return [2, null]
  }

  return [0, json]
}

/**
 * 结构是否符合 { later: Number, force: Number }
 * @param version
 * @returns {boolean|boolean}
 */
const checkStructure = (version) => {
  return typeof version.force === 'number' && typeof version.later === 'number'
}

const state = {
  storageKey,
  version: {
    later: _default,
    force: _default
  },
  openVersionBox: false // 刷新弹窗的状态，目的为了在axios成功，已弹窗提示用户更新 但用户又没有操作确认按钮时，下一次的axios不重复开启弹窗
}

const mutations = {
  SET_VERSION_BOX: (state, value) => {
    state.openVersionBox = value
  },
  SET_VERSION: (state, version) => {
    if (checkStructure(version)) {
      state.version = version
    }
  },
  CLEAR: (state) => {
    state.version = {
      later: _default,
      force: _default
    }
    window.localStorage.removeItem(storageKey)
  }
}

const actions = {
  clientVersion({ commit, state }, version) {
    if (!checkStructure(version)) {
      return
    }

    // 初始状态下，更新vuex和localStorage
    if (state.version.later === _default) {
      commit('SET_VERSION', version)
      setStorage(version)
      return
    }

    const [errno, local] = getStorage()
    if (errno !== 0) {
      setStorage(version)
      return
    }

    const openBox = (version, force) => {
      if (state.openVersionBox) {
        return
      }

      commit('SET_VERSION_BOX', true)
      const message = force
        ? '发现新版本，请刷新后继续使用'
        : '发现新版本，是否现在刷新？'

      MessageBox({
        title: '版本更新提示',
        message: message,
        confirmButtonText: '立即刷新',
        cancelButtonText: '稍后刷新',
        showClose: !force, // 显示右上角关闭按钮
        showCancelButton: !force, // 显示取消按钮
        closeOnPressEscape: !force, // 通过ESC关闭Box
        closeOnClickModal: !force, // 点击遮罩层关闭Box
        type: force ? 'warning' : 'success'
      })
        .then(() => {
          setStorage(version)
          window.location.reload()
        })
        .catch(_ => {
          !force && setStorage(version)
        })
        .finally(_ => {
          commit('SET_VERSION_BOX', false)
        })
    }

    if (local.force !== version.force) {
      openBox(version, true)
    } else if (local.later !== version.later) {
      openBox(version, false)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

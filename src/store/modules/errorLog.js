import { errorLogMultiple } from '@/api/cerror'

const state = {
  logs: [], // 所有日志，客户端展示用
  report: [], // 需上报的日志
  limit: 30000, // 定时器
  reporting: false, // 正在上报中,用于右上角icon转圈圈
  len: 10 // 除了定时器定时上报，当report长度超过此值也会立即触发上报
}

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
    state.report.push(log)
  },
  CLEAR_ERROR_LOG: (state) => {
    state.logs.splice(0)
  },
  CHG_REPORTING: (state, status) => {
    state.reporting = status
  }
}

const actions = {
  addErrorLog({ commit, dispatch, state }, log) {
    commit('ADD_ERROR_LOG', log)

    // 如果长度超过设定值，立即触发上报
    if (state.report.length >= state.len) {
      dispatch('doreport')
    }
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  },
  doreport: async({ commit, state, rootGetters }) => {
    commit('CHG_REPORTING', true)

    const userinfo = rootGetters.userinfo
    const data = []
    try {
      while (state.report.length > 0) {
        const item = state.report.pop()
        data.push({
          uid: userinfo.id || '',
          username: userinfo.username || '',
          realname: userinfo.realname || '',
          msg: item.err.message || '',
          tag: (item.vm && item.vm.$vnode && item.vm.$vnode.tag) ? item.vm.$vnode.tag : '',
          info: item.info || '',
          url: item.url,
          content: item.err.stack || '',
          instime: parseInt(item.time / 1000)
        })
      }

      if (data.length > 0) {
        await errorLogMultiple(data)
      }
    } catch (e) {
      console.error('doreport error ', e)
    }
    commit('CHG_REPORTING', false)
  },
  // 监听上报错误日志
  listen({ dispatch, state }) {
    setInterval(() => dispatch('doreport'), state.limit)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

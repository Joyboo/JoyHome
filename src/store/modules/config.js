
const state = {
  config: {}, // 应用全局配置
  cPageKey: 'cPage', // 当前页
  pSizeKey: 'pSize'
}

const mutations = {
  SET_CONFIG: (state, config) => {
    state.config = config
    if (config.paginate.var_page)
    {
      state.cPageKey = config.paginate.var_page
    }
    if (config.paginate.var_pagesize)
    {
      state.pSizeKey = config.paginate.var_pagesize
    }
  }
}

const actions = {
  setConfig({commit}, config) {
    commit('SET_CONFIG', config)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

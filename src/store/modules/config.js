import {glbcfg} from "@/api/sysinfo";

const state = {
  // 应用全局配置
  config: {
    region_domain: {
      domain: '',
      region: {}
    },
    paginate: {
      cnt_rows: 500,
      list_rows: 20,
      sizelist: [20, 100, 200, 300, 500],
      type: "bootstrap",
      var_page: "cPage",
      var_pagesize: "pSiz"
    },
    pma: []
  },
  cPageKey: 'cPage',
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
  setConfig({commit}) {
    return new Promise((resolve, reject) => {
      glbcfg()
        .then(({code, msg, data}) => {
          if (!code)
          {
            reject(msg)
          }
          commit('SET_CONFIG', data)
          resolve(data)
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

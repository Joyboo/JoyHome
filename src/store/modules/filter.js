
const state = {
  gamelist: {},
  pack_os: ['安卓','苹果','微软'],
  pay: {
    pf: { // 支付平台
      3: 'IOS',
      4: 'google',
      5: 'huawei',
      6: 'paypal',
      7: 'payssion',
      8: 'uwp'
    },
    //'status' => ['未付款','已付款未发货','已付款已发货', 6=>'第三方处理中', 7=>'CP响应出错']
    status: {
      0: '未付款',
      1: '已付款未发货',
      2: '已付款已发货',
      6: '第三方处理中',
      7: 'CP响应出错'
    }
  }
}

const mutations = {
  SET_GAMELIST: (state, data) => {
    // key必须为Number
    let list = {}
    for (const i  in data)
    {
      const key = parseInt(i)
      list[key] = data[i]
    }
    state.gamelist = list
  }
}

const actions = {
  gameInfo({commit, state}, data){
    commit('SET_GAMELIST', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

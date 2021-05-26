import {gamelist} from '@/api/game'

const state = {
  gamelist: [],
  filtergamelist: [], // 给选择游戏下拉框使用的，有label和 vlaue属性
  pack_os: ['安卓','苹果','微软'],
  pay: {
    pf: { // 支付平台
      3: 'IOS',
      4: 'google',
      5: 'huawei',
      6: 'paypal',
      7: 'payssion',
      8: 'uwp'
    }
  }
}

const mutations = {
  SET_SELECT_GAMELIST: (state, data) => {
    state.filtergamelist = data
  },
  SET_GAMELIST: (state, data) => {
    state.gamelist = data
  }
}

const actions = {
  gameInfo({commit, state}){
    // 游戏列表一般不会变动，检测到有数据就不执行
    if (state.gamelist.length > 0)
    {
      return;
    }
    gamelist().then(resp => {
      const {data} = resp

      // 生成select 的label和value
      let list = []
      data.forEach((name, id) => {
        list.push({
          label: name,
          value: id
        })
      })

      commit('SET_GAMELIST', data)
      commit('SET_SELECT_GAMELIST', list)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

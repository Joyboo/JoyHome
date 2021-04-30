import { topmenu } from '@/api/node'

const state = {
  topmenu: {},
  leftmenu: {}
}

const mutations = {
  SET_TOPMENU: (state, node) => {
    state.topmenu = node
  },
  SET_LEFTMENU: (state, node) => {
    state.leftmenu = node
  }
}

const actions = {
  getTopMenu({ commit }) {
    return new Promise((resolve, reject) => {
      topmenu().then(response => {
        const { data } = response
        commit('SET_TOPMENU', data)
        resolve(data)
      }).catch(error => {
        // console.log('getInfo catch', error)
        reject(error)
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

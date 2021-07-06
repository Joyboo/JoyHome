import router from '@/router'
import { getmenu } from '@/api/menu'
import Layout from '@/layout'
import RouterView from '@/layout/components/RouterView'
import {getSettingsLocalStorage} from "@/utils";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export function adminRouter(routerMap) {
  const arr = []

  let keys = ['name', 'redirect', 'always', 'meta', 'hidden']

  for(let i in routerMap)
  {
    let item = routerMap[i]

    let obj = { path: item.path }
    if (item.component == 'Layout') {
      obj.component = Layout
    } else if (item.component == 'RouterView') {
      obj.component = RouterView
    } else if (item.component) {
      obj.component = resolve => require([`@/views/${item.component}.vue`], resolve)
    }

    for (let i in keys) {
      if (typeof item[keys[i]] !== 'undefined') {
        obj[keys[i]] = item[keys[i]]
      }
    }

    if (item.children && item.children.length > 0) {
      obj.children = adminRouter(item.children)
    }
    arr.push(obj)
  }

  return arr
}

const state = {
  routes: [],
  topmenu: [],
  allmenu: [],
  mode: true // true-PC端的top菜单模式,false-手机端或非top菜单模式
}

const mutations = {

  // 路由注册
  SET_MENU(state, data) {
    state.allmenu = data
    const routes = adminRouter(data)
    router.addRoutes(routes)
  },

  SET_ROUTES(state, pid) {
    for (const item of state.allmenu) {
      if (item.id == pid) {
        state.routes = item.children
        break
      }
    }
  },
  // 设置sidebar
  SET_SIDEBAR(state, {mode, device}) {
    state.mode = device !== 'mobile' && mode
    if (state.mode)
    {
      state.topmenu = state.allmenu

      if (state.topmenu.length > 0) {
        const pid = state.topmenu[0].id
        for (const item of state.allmenu) {
          if (item.id == pid) {
            state.routes = item.children
            break
          }
        }
      }
    } else {
      state.routes = state.allmenu
    }
  }
}

const actions = {
  generateRoutes({ commit, state }, pid) {
    commit('SET_ROUTES', pid)
  },
  // 设备类型改变
  setSidebarByDevice({commit}, device) {
    const mode = getSettingsLocalStorage('topMenuMode')
    commit('SET_SIDEBAR', {mode: mode, device: device})
  },
  // 菜单模式改变
  setSidebarByMode({commit, rootState}, mode) {
    const device = rootState.app.device
    commit('SET_SIDEBAR', {mode: mode, device: device})
  },

  getRouter({ commit, rootState }) {

    return new Promise((resolve, reject) => {
      getmenu()
        .then(({ code, msg, data }) => {
          if (!code)
          {
            reject(msg)
          } else {
            commit('SET_MENU', data)
            resolve(data)
          }
        })
        .catch(error => {
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

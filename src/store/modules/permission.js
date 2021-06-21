import router from '@/router'
import { leftmenu } from '@/api/menu'
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
  leftmenu: {}
}

const mutations = {

  // 无TOP菜单模式
  SET_MENU(state, data) {
    state.topmenu = state.routes = state.leftmenu = []
    const routes = adminRouter(data)
    router.addRoutes(routes)
    state.routes = routes
  },

  // 有TOP一级菜单模式
  SET_MENU_TOP(state, data) {
    state.routes = state.leftmenu = []
    const top = []
    // 将第一级设置为topmenu
    for(const item of data)
    {
      top.push({id: item.id, icon: item.meta.icon, title: item.meta.title})

      // 第二级为leftmenu
      if (typeof item.children == 'object')
      {
        // 从第二级开始加入路由
        const routes = adminRouter(item.children)
        router.addRoutes(routes)

        state.leftmenu[item.id] = routes
      }
    }

    state.topmenu = top

    // 设置左菜单
    if (state.topmenu.length > 0)
    {
      const defaultTopid = state.topmenu[0].id
      state.routes = state.leftmenu[defaultTopid]
    }
  },
  SET_ROUTES(state, pid) {
    state.routes = state.leftmenu[pid]
  }
}

const actions = {
  generateRoutes({ commit, state }, pid) {
    commit('SET_ROUTES', pid)
  },

  getRouter({ commit, rootState }) {
    // mobile or desktop
    const isMobile = rootState.app.device === 'mobile'

    const topMenuMode = getSettingsLocalStorage('topMenuMode', rootState.settings.topMenuMode)

    return new Promise((resolve, reject) => {
      leftmenu({pid: 0})
        .then(({ code, msg, data }) => {
          if (!code)
          {
            reject(msg)
          } else {
            if (!isMobile && topMenuMode)
            {
              commit('SET_MENU_TOP', data)
            }
            else {
              commit('SET_MENU', data)
            }

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

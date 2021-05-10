import { asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'
import { leftmenu, topmenu } from '@/api/menu'
import Layout from '@/layout'
import RouterView from '@/layout/components/RouterView'

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

export function adminRouter(asyncRouterMap) {
  const arr = []
  /*
  // 多级菜单的动态路有示例
  return {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: '/menu',
        component: () => import('@/layout/routerView'),
        name: 'Menu1',
        meta: { title: 'menu1' },
        // redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: '/menu/index',
            component: () => import('@/views/menu/index/index'),
            name: 'Menu1-1',
            meta: { title: 'menu1-1ggggg' }
          },
          {
            path: '/menu/info',
            component: () => import('@/views/menu/info/index'),
            name: 'Menu1-1',
            meta: { title: 'info' }
          }
        ]
      }
    ]
  };*/

  asyncRouterMap.forEach(item => {
    const obj = { path: item.path }

    if (item.component == 'Layout') {
      obj.component = Layout
    } else if (item.component == 'RouterView') {
      obj.component = RouterView
    } else if (item.component) {
      obj.component = resolve => require([`@/views/${item.component}.vue`], resolve)
    }

    const keys = ['name', 'redirect', 'always', 'meta', 'hidden', 'affix']
    for (const i in keys) {
      if (typeof item[keys[i]] !== 'undefined') {
        obj[keys[i]] = item[keys[i]]
      }
    }

    if (item.children && item.children.length > 0) {
      obj.children = adminRouter(item.children)
    }
    arr.push(obj)
  })

  return arr
}

const state = {
  routes: [],
  addRoutes: [],
  topmenu: {},
  // leftmenu: {},
  topid: 0
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    routes = adminRouter(routes)
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    router.addRoutes(state.routes)
  },
  SET_TOPMENU: (state, node) => {
    state.topmenu = node
  },
  SET_PID: (state, pid) => {
    state.topid = pid
  }
}

const actions = {
  generateRoutes({ commit, state }, roles) {
    return new Promise((resolve, reject) => {
      leftmenu({ pid: state.topid }).then(response => {
        const { data } = response
        commit('SET_ROUTES', data)
        resolve(data)
      }).catch(error => {
        // console.log('getInfo catch', error)
        reject(error)
      })
    })
  },

  setPid({ commit }, pid) {
    commit('SET_PID', pid)
  },
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

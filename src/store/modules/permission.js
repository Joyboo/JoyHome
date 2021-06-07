import { asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'
import { leftmenu, topmenu } from '@/api/menu'
import Layout from '@/layout'
import RouterView from '@/layout/components/RouterView'
import DevelopRoutes from '@/router/modules/develop'

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

  let keys = ['name', 'redirect', 'always', 'meta', 'hidden', 'affix']

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

  SET_MENU(state, data) {
    // 将第一级设置为topmenu
    for(let i in data)
    {
      let one = data[i]

      state.topmenu.push({
        id: one.id,
        icon: one.meta.icon,
        title: one.meta.title
      })

      // 第二级为leftmenu
      if (typeof one.children == 'object')
      {
        // 从第二级开始加入路由
        const routes = adminRouter(one.children)
        router.addRoutes(routes)

        state.leftmenu[one.id] = routes
      }
    }

    // 设置左菜单
    if (state.topmenu.length > 0)
    {
      const defaultTopid = state.topmenu[0].id
      state.routes = state.leftmenu[defaultTopid]
    }

    // 如果是开发环境
    if (process.env.NODE_ENV === 'development')
    {
      const devid = "-1"
      state.topmenu.push({
        id: devid,
        icon: 'el-icon-eleme',
        title: '开发环境'
      })
      router.addRoutes(DevelopRoutes)

      const dev = []
      DevelopRoutes.forEach(item => {
        dev.push(...item.children)
      })
      state.leftmenu[devid] = dev
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

  getTopMenu({ commit }) {
    return new Promise((resolve, reject) => {
      leftmenu({pid: 0})
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

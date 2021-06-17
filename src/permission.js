import router from './router'
import store from './store'
import { Message, Loading } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 未登录时的白名单路由
const whiteList = ['/login', '/auth-redirect', '/redirect', '/404']
// 已登录时的白名单路由
// const loginWhiteList = ['/404', '/401', '/icon', '/', '/dashboard', 'dashboard', '/auth-redirect', '/redirect']

// add by Joyboo 嵌套2级以上菜单时，处理多个router-view容器keep-alive不生效的问题，参考：https://blog.csdn.net/qq_41912398/article/details/109576635
const handleKeepAlive = (to) => {
  if (to.matched && to.matched.length > 2)
  {
    for (let i = 0; i < to.matched.length; i++)
    {
      const element = to.matched[i]
      // 注意keep-alive的include匹配的是组件的name值而非router的name
      if (element.components.default.name === 'RouterView')
      {
        to.matched.splice(i, 1)
        handleKeepAlive(to)
      }
    }
  }
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {

        handleKeepAlive(to)
        next()

      } else {
        try {
          let myLoading = Loading.service();

          // 获取菜单，动态路由
          await store.dispatch('permission/getTopMenu')

          // 获取用户详情
          await store.dispatch('user/getInfo')

          // 获取全局配置
          await store.dispatch('config/setConfig')

          // 监听错误日志上报
          store.dispatch('errorLog/listen')

          myLoading.close();

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          console.error('primission error ', error)
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

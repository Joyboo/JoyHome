import router from './router'
import store from './store'
import { Message, MessageBox } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 未登录时的白名单路由
const whiteList = ['/login', '/auth-redirect', '/redirect', '/404']
// 已登录时的白名单路由
const loginWhiteList = ['/404', '/401', '/icon', '/', '/dashboard', 'dashboard', '/auth-redirect', '/redirect']

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

        const roles = store.getters.roles
        // 超级管理员
        const admin = roles.indexOf('admin') >= 0
        // add by Joyboo 权限验证
        if (admin || roles.indexOf(to.path) >= 0 || loginWhiteList.indexOf(to.path) >= 0)
        {
          next()
        }
        else {
          MessageBox.confirm('对不起，没有权限：' + to.path, {
            type: 'error',
            showClose: false,
            showCancelButton: false
          })
            .then(() => {
              next({ path: from.path })
            })
            .catch(() => {
              next({ path: from.path })
            })
        }
      } else {
        try {
          // add by Joyboo 获取top菜单
          await store.dispatch('permission/getTopMenu')
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // edit by Joyboo 注释了43和46行，动态追加路由之前需要指定最顶级的top菜单id
          // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/generateRoutes')

          // dynamically add accessible routes
          // router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
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

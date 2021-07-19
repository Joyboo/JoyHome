import axios from 'axios'
import { MessageBox, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import i18n from '@/lang'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
  timeoutErrorMessage: i18n.t('requestTimeout') + ' ^_^'
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Token'] = getToken()
    }

    config.headers['Accept-Language'] = store.getters.language

    /* if (config.method.toLowerCase() == 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      if (typeof config.data === 'object') {
        config.data = queryParams(config.data)
      }
    }*/

    // config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log('response', response)
    const res = response.data

    // 重新登录
    if (res.code === 1000) {
      MessageBox.confirm(res.data || i18n.t('login.reLogin'), i18n.t('login.confirmLogout'), {
        confirmButtonText: i18n.t('login.reLogin'),
        cancelButtonText: i18n.t('cancel'),
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (res.code === 500) {
      // 服务端程序异常
      const message = res.msg || 'default Error 500'
      Notification({
        title: i18n.t('serverError'),
        message: message,
        type: 'error',
        duration: 5 * 1000
        // offset: 10
      })
      return Promise.reject(new Error(message))
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

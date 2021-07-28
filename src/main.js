import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import store from './store'
import router from './router'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import { mockXHR } from '../mock'
mockXHR()

const app = createApp(App)

app.use(ElementPlus, {
  size: Cookies.get('size') || 'mini',
  // i18n: (key, value) => i18n.t(key, value)
  i18n: i18n.global.t
})
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')

export default app

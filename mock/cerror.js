const { parseTime } = require('./utils')

module.exports = [
  {
    url: '/admin/cerror/add',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: []
      }
    }
  }, {
    url: '/admin/cerror/multiple',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: []
      }
    }
  }, {
    url: '/admin/cerror/index',
    type: 'get',
    response: config => {
      const size = config.query['pSize'] || 20
      const data = []
      const today = parseTime((new Date()).getTime())
      for (let i = size; i > 0; i--) {
        data.push({
          'id': i,
          'uid': '4',
          'username': '18666666666',
          'realname': 'Joyboo',
          'msg': "Cannot read property 'hasAttribute' of null",
          'tag': 'vue-component-32-ElButton',
          'info': 'v1',
          'url': 'http://localhost:9557/#/order/index',
          'content': 'Error: fhjdksafhsafsaf\\n    at VueComponent.data (webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/statistics/daily.vue?vue&type=script&lang=js&:45:11)\\n    at getData (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:4734:17)\\n    at initData (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:4691:7)\\n    at initState (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:4630:5)\\n    at VueComponent.Vue._init (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:4990:5)\\n    at new VueComponent (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:5138:12)\\n    at createComponentInstanceForVnode (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:3280:10)\\n    at init (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:3111:45)\\n    at createComponent (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:5962:9)\\n    at createElm (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:5909:9)',
          'instime': '1626164086',
          'itime': today
        })
      }
      return {
        code: 1,
        msg: 'success',
        data: {
          totals: data.length,
          data: data
        }
      }
    }
  }
]

const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const menu = require('./menu')
const sysinfo = require('./sysinfo')
const game = require('./game')
const statistics = require('./statistics')
const _package = require('./package')
const dashboard = require('./dashboard')
const reg = require('./reg')
const order = require('./order')
const cerror = require('./cerror')
const role = require('./role')
const admin = require('./admin')

const mocks = [
  ...user,
  ...menu,
  ...sysinfo,
  ...game,
  ...statistics,
  ..._package,
  ...dashboard,
  ...reg,
  ...order,
  ...cerror,
  ...role,
  ...admin
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

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
          'content': 'this is error stack trace',
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

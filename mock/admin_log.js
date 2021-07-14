const { parseTime } = require('./utils')

module.exports = [
  {
    url: '/admin/admin_log/index',
    type: 'get',
    response: config => {
      const size = config.query['pSize'] || 20
      const data = []
      const stamp = parseInt((new Date()).getTime() / 1000)
      const fmt = parseTime(stamp)
      for (let i = size; i > 0; --i) {
        data.push({
          id: i,
          uid: '1',
          name: 'Joyboo',
          ip: '127.0.0.1',
          instime: '1625814136',
          updtime: '1625814136',
          itime: fmt,
          utime: fmt
        })
      }
      return {
        code: 1,
        msg: 'success',
        data: {
          totals: data.length,
          data
        }
      }
    }
  }
]

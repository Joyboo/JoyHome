const { parseTime } = require('./utils')

module.exports = [
  {
    url: '/admin/log/index',
    type: 'get',
    response: config => {
      const stamp = parseInt((new Date()).getTime() / 1000)
      const fmt = parseTime(stamp)
      const size = config.query['pSize'] || 20
      const data = []
      for (let i = size; i > 0; --i) {
        data.push({
          id: i,
          admid: '9',
          content: "UPDATE `admin`  SET `remark`='每天迷人一丝丝' WHERE `name`='Joyboo'",
          instime: '1625815864',
          ip: '127.0.0.1',
          itime: fmt,
          admname: 'Joyboo'
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

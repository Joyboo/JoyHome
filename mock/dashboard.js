const { makeRound } = require('./utils')

module.exports = [
  {
    url: '/admin/index/dashboard',
    type: 'get',
    response: config => {
      // 今日
      const today = makeRound(5)
      // 昨日
      const yesterday = makeRound(5)
      // 本月
      const month = makeRound(7)
      // 上月
      const lastmonth = makeRound(7)

      // 折线图
      const chartKey = ['reg', 'dau', 'money', 'ffl', 'arppu', 'arpu']
      const chartData = {}
      chartKey.forEach(item => {
        const week = []; const last = []
        for (let i = 0; i < 7; ++i) {
          week.push(makeRound(5))
          last.push(makeRound(5))
        }
        chartData[item] = {
          week, last
        }
      })

      return {
        code: 1,
        msg: 'success',
        data: {
          revenue: { today, yesterday, month, lastmonth },
          chart: chartData
        }
      }
    }
  }
]

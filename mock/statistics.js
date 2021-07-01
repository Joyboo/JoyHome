const { listdate, makeRound } = require('./utils')

const list = listdate(-30)

module.exports = [
  {
    url: '/admin/statistics/daily',
    type: 'get',
    response: config => {

      const data = []
      let znt = {
        h: "--",
        arpu: makeRound(0, 2),
        newArpu: makeRound(0, 2),
        arppu: makeRound(2, 2),
        newArppu: makeRound(2, 2)
      }
      const sumKey = ['persons', 'nps', 'login', 'reg', 'atv', 'money', 'nfs', 'tas', 'fftotal', 'ffl']

      for(const t of list)
      {
        const item = {
          ymd: t,
          reg: makeRound(3),
          atv: makeRound(3),
          login: makeRound(4),
          money: makeRound(3, 2),
          persons: makeRound(2),
          nfs: makeRound(2, 2),
          nps: makeRound(2),
          ffl: makeRound(1, 2),
          cnt: makeRound(1),
          tas: makeRound(2),
          fftotal: makeRound(1, 2),
          newArpu: makeRound(0, 2),
          arpu: makeRound(0, 2),
          newArppu: makeRound(2, 2),
          arppu: makeRound(2, 2)
        }
        data.push(item)

        for(const key of sumKey)
        {
          znt[key] = parseFloat(znt[key] || 0) + parseFloat(item[key] || 0)
        }
      }

      data.unshift(znt)

      return {
        code: 1,
        msg: "success",
        data: {
          totals: data.length,
          data: data
        }
      }
    }
  }
]

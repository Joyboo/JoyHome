const { listdate, makeRound } = require('./utils')

const list = listdate(-30)

module.exports = [
  {
    url: '/admin/statistics/daily',
    type: 'get',
    response: config => {
      const data = []
      // 合计行
      const znt = {
        h: '--',
        arpu: makeRound(0, 2),
        newArpu: makeRound(0, 2),
        arppu: makeRound(2, 2),
        newArppu: makeRound(2, 2)
      }
      const sumKey = ['persons', 'nps', 'login', 'reg', 'atv', 'money', 'nfs', 'tas', 'fftotal', 'ffl']

      for (const t of list) {
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

        for (const key of sumKey) {
          // znt[key] = parseFloat(znt[key] || 0) + parseFloat(item[key] || 0)
          znt[key] = parseInt((znt[key] || 0) + (item[key] || 0) * 100) / 100
        }
      }

      data.unshift(znt)

      return {
        code: 1,
        msg: 'success',
        data: {
          totals: data.length,
          data: data
        }
      }
    }
  },
  {
    url: '/admin/statistics/ltv',
    type: 'get',
    response: config => {
      const data = []

      const ds = [1, 2, 3, 4, 5, 6, 7, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 120]

      for (const t of list) {
        const item = {
          ymd: t,
          gameid: 1,
          reg: makeRound(5),
          sum: makeRound(6),
          money: makeRound(3, 2),
          m: makeRound(2, 2)
        }
        ds.forEach(d => {
          const dk = 'd' + d
          item[dk] = {
            ymd: t,
            reg: makeRound(3),
            sum: makeRound(2, 2),
            money: makeRound(3, 2)
          }
        })
        data.push(item)
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
  },
  {
    url: '/admin/statistics/regkeep',
    type: 'get',
    response: config => {
      const data = []
      const ds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 40, 50, 60]

      for (const t of list) {
        const item = {
          ymd: t,
          gameid: 1,
          reg: makeRound(5)
        }
        ds.forEach(d => {
          const dk = 'd' + d
          item[dk] = {
            a: makeRound(4)
          }
        })
        data.push(item)
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
  },
  {
    url: '/admin/statistics/paykeep',
    type: 'get',
    response: config => {
      const data = []
      const ds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 40, 50, 60]

      for (const t of list) {
        const item = {
          ymd: t,
          fstcnt: makeRound(5)
        }
        ds.forEach(d => {
          const dk = 'd' + d
          item[dk] = makeRound(4)
        })
        data.push(item)
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
  },
  {
    url: '/admin/statistics/roi',
    type: 'get',
    response: config => {
      const data = []
      const ds = [1, 2, 3, 4, 5, 6, 7, 15, 20, 25, 30, 40, 50, 60, 90, 120, 180]

      const znt = { h: '--' }
      const sumKey = ['cost', 'reg', 'sum', 'money', 'm', 'per', 'backrate']

      for (const t of list) {
        const item = {
          ymd: t,
          gameid: '炉石传说',
          cost: makeRound(5, 2),
          reg: makeRound(4),
          per: makeRound(1, 2),
          sum: makeRound(5, 2),
          m: makeRound(3, 2),
          money: makeRound(3, 2),
          backrate: makeRound(2)
        }
        ds.forEach(d => {
          const dk = 'd' + d
          item[dk] = {
            ymd: t,
            reg: makeRound(3),
            m: makeRound(3, 2),
            p: makeRound(2),
            money: makeRound(4, 2),
            sum: makeRound(3, 2)
          }
        })
        data.push(item)

        sumKey.forEach(_key => {
          znt[_key] = parseInt((znt[_key] || 0) + item[_key] * 100) / 100
        })
      }

      data.unshift(znt)

      return {
        code: 1,
        msg: 'success',
        data: {
          totals: data.length,
          data: data
        }
      }
    }
  },
  {
    url: '/admin/statistics/droi',
    type: 'get',
    response: config => {
      const data = []
      const ds = [1, 2, 3, 4, 5, 6, 7, 15, 20, 25, 30, 40, 50, 60, 90, 120, 180]

      const znt = { h: '--' }
      const sumKey = ['cost', 'reg', 'sum', 'money', 'm', 'per', 'backrate']

      for (const t of list) {
        const item = {
          ymd: t,
          gameid: '炉石传说',
          cost: makeRound(5, 2),
          reg: makeRound(4),
          per: makeRound(1, 2),
          sum: makeRound(5, 2),
          m: makeRound(3, 2),
          money: makeRound(3, 2),
          backrate: makeRound(2)
        }
        ds.forEach(d => {
          const dk = 'd' + d
          item[dk] = {
            ymd: t,
            reg: makeRound(3),
            m: makeRound(3, 2),
            p: makeRound(2),
            money: makeRound(4, 2),
            sum: makeRound(3, 2)
          }
        })
        data.push(item)

        sumKey.forEach(_key => {
          znt[_key] = parseInt((znt[_key] || 0) + item[_key] * 100) / 100
        })
      }

      data.unshift(znt)

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

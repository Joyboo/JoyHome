const { listdate, makeRound, makeRoundString, parseTime } = require('./utils')

const list = listdate(-30, 0, '{y}-{m}-{d} {h}:{i}:{s}')

// 3-8
const pfunc = val => {
  const pf = val % 9
  return pf < 3 ? (pf + 3) : pf
}

module.exports = [
  {
    url: '/admin/reg/index',
    type: 'get',
    response: config => {
      const data = []
      list.forEach(item => {
        const stamp = parseInt((new Date(item)).getTime() / 1000)
        data.push({
          uid: makeRound(10),
          username: 'Joyboo',
          devid: makeRoundString(20),
          sdkver: 1.0,
          pkgbnd: 'package8',
          ip: (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255),
          exmodel: 'iphone ' + ((makeRound(2) % 10) + 10),
          instime: stamp,
          itime: item
        })
      })

      return {
        code: 1,
        msg: 'success',
        data: {
          totals: data.length,
          data
        }
      }
    }
  }, {
    url: '/admin/reg/detail',
    type: 'get',
    response: config => {
      const uid = config.query.uid || makeRound(10)
      return {
        code: 1,
        msg: 'success',
        data: {
          token: makeRoundString(255),
          user: {
            uwp: makeRoundString(15),
            gmail: makeRoundString(15),
            huawei: makeRoundString(15),
            facebook: makeRoundString(15)
          },
          data: {
            uid: uid,
            username: 'Joyboo',
            devid: makeRoundString(20),
            sdkver: 1.0,
            pkgbnd: 'package8',
            ip: (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255),
            exmodel: 'iPhone ' + ((makeRound(2) % 10) + 10)
          },
          bind: [
            {
              type: 'facebook',
              value: makeRoundString(21)
            }, {
              type: 'gmail',
              value: ''
            }, {
              type: 'huawei',
              value: ''
            }, {
              type: 'uwp',
              value: makeRoundString(21)
            }
          ]
        }
      }
    }
  }, {
    url: '/admin/pay/index',
    type: 'get',
    response: config => {
      const data = []

      let max = 7932
      list.forEach(time => {
        const uid = config.query.uid || makeRound(10)
        const stamp = parseInt((new Date(time)).getTime() / 1000)

        data.push({
          id: max,
          uid: uid,
          pf: pfunc(makeRound(4)),
          money: makeRound(4),
          receipts: makeRound(3),
          paysn: makeRound(15),
          status: makeRound(3) % 3,
          sdkver: '1.0',
          devid: makeRoundString(20),
          pkgbnd: 'package8',
          ip: (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255),
          os: makeRound(2) % 2,
          osver: '14.5',
          exmodel: 'iPhone ' + ((makeRound(2) % 10) + 10),
          versioncode: '6.0',
          gno: makeRound(1) % 2,
          instime: stamp,
          updtime: stamp,
          itime: time,
          utime: time,
          extension: {
            sid: makeRound(4),
            vip: makeRound(1),
            istest: 0,
            roleid: makeRound(10),
            rolename: 'Joyboo',
            productid: 'productid',
            productdesc: 'productdesc',
            productname: 'productname'
          }
        })
        --max
      })

      const totals = data.length
      const znt = ['页汇总', '总汇总']
      znt.forEach(item => {
        data.unshift({
          pk: item,
          id: 'sum',
          money: makeRound(4, 2),
          receipts: makeRound(4, 2)
        })
      })

      return {
        code: 1,
        msg: 'success',
        data: {
          totals: totals,
          data
        }
      }
    }
  }, {
    url: '/admin/login/index',
    type: 'get',
    response: config => {
      const uid = config.query.uid || makeRound(10)
      const data = []

      list.forEach(time => {
        const stamp = parseInt((new Date(time)).getTime() / 1000)
        data.push({
          uid: uid,
          sdkver: '1.0',
          devid: makeRoundString(15),
          pkgbnd: 'package8',
          ip: (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255),
          os: makeRound(2) % 2,
          osver: '14.5',
          exmodel: 'iPhone ' + ((makeRound(2) % 10) + 10),
          versioncode: '6.0',
          dtorid: '3',
          fastpay: 0,
          instime: stamp,
          itime: time
        })
      })

      return {
        code: 1,
        msg: 'success',
        data: {
          totals: data.length,
          data
        }
      }
    }
  },
  {
    url: '/admin/pay/detail',
    type: 'get',
    response: config => {
      const uid = config.query.uid || makeRound(10)
      const stamp = parseInt((new Date()).getTime() / 1000)
      return {
        code: 1,
        msg: 'success',
        data: {
          id: makeRound(4),
          uid: uid,
          pf: pfunc(makeRound(2)),
          money: makeRound(5),
          ymd: stamp,
          paysn: makeRoundString(20),
          updtime: stamp,
          status: makeRound(2) % 2,
          sdkver: '1.0',
          devid: makeRoundString(20),
          pkgbnd: 'package8',
          ip: (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255),
          os: makeRound(2) % 2,
          exmodel: makeRoundString(10),
          instime: stamp,
          itime: parseTime(stamp),
          utime: parseTime(stamp),
          extension: {
            sid: makeRound(4),
            vip: makeRound(1),
            istest: 0,
            roleid: makeRound(10),
            rolename: 'Joyboo',
            productid: 'productid',
            productname: 'productname'
          },
          gname: '炉石传说',
          package: {
            name: '炉石-正式包',
            pkgbnd: 'Joyboo'
          }
        }
      }
    }
  },
  {
    url: '/admin/reg/unbindBack',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: []
      }
    }
  }
]

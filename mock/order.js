const { listdate, makeRound, makeRoundString, parseTime } = require('./utils')

const list = listdate(-30, 0, '{y}-{m}-{d} {h}:{i}:{s}')

// 3-8
const pfunc = val => {
  const pf = val % 9
  return pf < 3 ? (pf + 3) : pf
}

module.exports = [
  {
    url: '/admin/order/index',
    type: 'get',
    response: config => {
      const data = []

      let max = 6873

      list.forEach(time => {
        const uid = config.query.uid || makeRound(10)
        const stamp = parseInt((new Date(time)).getTime() / 1000)
        data.push({
          id: max,
          uid: uid,
          pf: pfunc(makeRound(2)),
          money: makeRound(5),
          paysn: makeRoundString(20),
          updtime: stamp,
          instime: stamp,
          utime: time,
          itime: time,
          status: makeRound(2) % 3,
          sdkver: '1.0',
          devid: makeRoundString(25),
          pkgbnd: 'package8',
          ip: (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255) + '.' + (makeRound(3) % 255),
          os: makeRound(2) % 2,
          exmodel: makeRoundString(10),
          extension: {
            sid: makeRound(4),
            vip: makeRound(1),
            roleid: makeRound(10),
            rolename: "Joyboo",
            productid: "productid",
            productname: "productname"
          }

        })
        --max
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
  }
  , {
    url: '/admin/order/detail',
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
            rolename: "Joyboo",
            productid: "productid",
            productname: "productname"
          },
          gname: "炉石传说",
          package: {
            name: "炉石-正式包",
            pkgbnd: "Joyboo"
          }
        }
      }
    }
  }
  ,{
    url: '/admin/order/callBackOrder',
    type: 'post',
    response: config => {
      const stamp = parseInt((new Date()).getTime() / 1000)
      const fmt = parseTime(stamp)
      return {
        code: 1,
        msg: 'success',
        data: {
          out_trade_no: makeRound(20),
          transaction_id: makeRound(20),
          instime: stamp,
          itime: fmt,
          updtime: stamp,
          utime: fmt,
          pkgbnd: 'package',
          money: makeRound(5),
          gameid: 2
        }
      }
    }
  }
  , {
    url: '/admin/order/repairOrder',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: 'ok',
        data: []
      }
    }
  }
]

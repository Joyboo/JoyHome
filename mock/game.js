
const { makeRound, makeRoundString, parseTime } = require('./utils')

const games = {
  1: '炉石传说',
  2: '和平精英'
}

module.exports = [
  {
    url: '/admin/game/gamelist',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: games
      }
    }
  },
  {
    url: '/admin/game/index',
    type: 'get',
    response: config => {
      const data = []

      for (const i in games) {
        // 实际上参数远不止这些，此处仅mock需要的参数
        data.push({
          id: i,
          name: games[i],
          sort: 0,
          isshow: '1',
          instime: '0',
          deltime: '0',
          extension: {
            logkey: makeRoundString(20),
            paykey: makeRoundString(20)
          }
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
  },
  {
    url: '/admin/game/del',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  },
  {
    url: '/admin/game/add',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  },
  {
    url: '/admin/game/edit',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  },
  {
    url: '/admin/game/edit',
    type: 'get',
    response: config => {
      const id = config.query.id || ''
      const today = parseTime((new Date()).getTime(), '{y}-{m}-{d}')
      return {
        code: 1,
        msg: 'success',
        data: {
          data: {
            id: id,
            name: games[id],
            sort: '1',
            isshow: '1',
            instime: '0',
            extension: {
              mtn: {
                notice: 'Joyboo Test Notice',
                switch: '0',
                endtime: today + ' 12:00:00',
                begintime: today + ' 13:30:00'
              },
              type: '0',
              h5sdk: {
                name: 'Joyboo Game',
                gameid: 1,
                isshow: '0',
                mnlogo: '',
                pkgbnd: '',
                carousel: '',
                gamelogo: '',
                isshowmnlogo: '0'
              },
              divide: {
                cp: makeRound(2),
                ios: makeRound(2),
                uwp: makeRound(2),
                google: makeRound(2),
                huawei: makeRound(2),
                paypal: makeRound(1),
                payssion: makeRound(2),
                'paypal-fix': '0.05'
              },
              google: {
                privacy: 'https://github.com/Joyboo'
              },
              logkey: makeRoundString(10),
              logurl: '',
              paykey: makeRoundString(10),
              h5entry: '',
              facebook: {
                fansurl: ''
              },
              goodsids: '',
              default_path: ''
            }
          }
        }
      }
    }
  }, {
    url: '/admin/game/gameall',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: games
      }
    }
  }
]

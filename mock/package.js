const { listdate, makeRound, makeRoundString } = require('./utils')

const list = listdate(-30, 0, '{y}-{m}-{d} {h}:{i}:{s}')

module.exports = [
  {
    url: '/admin/package/childOption*',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'msg': 'success',
        'data': {
          '3': {
            'id': '3',
            'name': '包3',
            'pkgbnd': 'package3'
          },
          '6': {
            'id': '6',
            'name': '包6',
            'pkgbnd': 'package6'
          },
          '8': {
            'id': '8',
            'name': '包8',
            'pkgbnd': 'package8'
          },
          '9': {
            'id': '9',
            'name': '包9',
            'pkgbnd': 'package9'
          },
          '10': {
            'id': '10',
            'name': '包10',
            'pkgbnd': 'package10'
          },
          '11': {
            'id': '11',
            'name': '包11',
            'pkgbnd': 'package11'
          }
        }
      }
    }
  },
  {
    url: '/admin/package/index',
    type: 'get',
    response: config => {
      const data = []

      let maxId = 3476
      list.forEach(item => {
        data.push({
          id: maxId,
          gameid: 1,
          name: 'package.' + makeRoundString(5).toLocaleLowerCase(),
          url: '',
          pkgbnd: 'com.' + makeRoundString(10).toLocaleLowerCase() + '.' + makeRoundString(5).toLocaleLowerCase(),
          os: makeRound(2) % 3,
          extension: {
            logkey: makeRoundString(20),
            paykey: makeRoundString(20),
            payurl: 'https://github.com/Joyboo'
          }
        })
        --maxId
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
    url: '/admin/package/del',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: '删除成功',
        data: []
      }
    }
  },
  {
    url: '/admin/package/edit',
    type: 'get',
    response: config => {
      const event = []
      for (let i = 0; i < 10; i++) {
        event.push({
          Key: makeRoundString(6),
          Value: makeRoundString(10)
        })
      }

      const data = {
        id: config.query.id || '',
        gameid: 1,
        name: 'package.' + makeRoundString(5).toLocaleLowerCase(),
        url: '',
        pkgbnd: 'com.' + makeRoundString(10).toLocaleLowerCase() + '.' + makeRoundString(5).toLocaleLowerCase(),
        os: makeRound(2) % 3,
        extension: {
          logkey: makeRoundString(20),
          paykey: makeRoundString(20),
          payurl: 'https://github.com/Joyboo',
          mg: {
            appkey: makeRoundString(30),
            publickey: makeRoundString(30)
          },
          qzf: {
            pf: '',
            enable: '0'
          },
          share: {
            img: ''
          },
          adjust: {
            event: event,
            currency: 'USD'
          },
          aihelp: {
            sectionid: makeRound(5)
          },
          domain: {
            pay: 'https://github.com/Joyboo',
            sdk: 'https://github.com/Joyboo',
            report: 'https://github.com/Joyboo'
          },
          google: {
            web_clientid: makeRoundString(80)
          },
          huawei: {
            production: {
              clientid: makeRoundString(80),
              clientsecret: makeRoundString(80)
            }
          },
          paypal: {
            env: '1',
            sandbox: {
              clientid: makeRoundString(50),
              clientsecret: makeRoundString(50)
            },
            production: {
              clientid: makeRoundString(50),
              clientsecret: makeRoundString(50)
            }
          },
          rating: {
            pop: '0',
            time: '5',
            bgurl: '',
            btnurl: '',
            titurl: '',
            lefturl: '',
            righturl: '',
            storeurl: ''
          },
          h5entry: 'https://github.com/Joyboo',
          facebook: {
            appid: makeRound(10),
            bindnotice: 'https://github.com/Joyboo'
          },
          payssion: {
            env: '1',
            sandbox: {
              clientid: makeRoundString(20),
              clientsecret: makeRoundString(50)
            },
            production: {
              clientid: makeRoundString(20),
              clientsecret: makeRoundString(50)
            }
          },
          google_paykey: makeRoundString(200),
          default_path: 'https://github.com/Joyboo'
        }
      }

      return {
        code: 1,
        msg: 'success',
        data: { data }
      }
    }
  },
  {
    url: '/admin/package/edit',
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
    url: '/admin/package/add',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  }
]

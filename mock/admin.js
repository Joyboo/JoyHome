const { makeRound } = require('./utils')

module.exports = [
  {
    url: '/admin/admin/index',
    type: 'get',
    response: config => {
      const data = []
      for (let i = 50; i > 0; i--) {
        data.push({
          'id': i,
          'username': '18666666666',
          'password': '$2y$10$9BBPQ9VvfafcCAgq.TbMteZGPFu2WwVJNDZaDzgb.C37lLK43iqWce',
          'realname': 'Joyboo-' + i,
          'rid': (makeRound(2) % 6) + 1,
          'sort': '1',
          'extension': {
            'gid': '1',
            'newnid': '0',
            'ntcids': [],
            'status': '1',
            'gameids': '1,2'
          },
          'instime': '1621927018',
          'itime': '2021-05-25 02:16:58'
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
  }, {
    url: '/admin/admin/add',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  }, {
    url: '/admin/admin/edit',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  }, {
    url: '/admin/admin/del',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  }, {
    url: '/admin/admin/edit',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: {
          data: {
            id: '10',
            username: '18666666666',
            realname: 'Joyboo',
            rid: '2',
            sort: '1',
            extension: {
              gid: 1,
              newnid: '57',
              ntcids: [],
              status: '1',
              gameids: [1, 2]
            }
          }
        }
      }
    }
  }, {
    url: '/admin/admin/modify',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: {
          data: {
            id: '14',
            username: '18666666666',
            realname: 'Joyboo',
            rid: '1',
            sort: '1',
            extension: {
              gid: 2,
              newnid: '57',
              ntcids: [],
              status: '1',
              gameids: [1, 2]
            }
          }
        }
      }
    }
  }, {
    url: '/admin/admin/modify',
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

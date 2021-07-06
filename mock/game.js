module.exports = [
  {
    url: '/admin/game/gamelist',
    type: 'get',
    response: config => {

      return {
        code: 1,
        msg: 'success',
        data: {
          1: '炉石传说',
          2: '和平精英'
        }
      }
    }
  }
]

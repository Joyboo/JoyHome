
module.exports = [
  // user login
  {
    url: '/admin/pub/login',
    type: 'post',
    response: config => {

      const { username,password } = config.body

      if (username == 'Joyboo' && password == '123456')
      {
        return {
          code: 1,
          data: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMYW1zb24iLCJpYXQiOjE2MjUxMjEzMTMsImV4cCI6MTYyNTM4MDUxMywibmJmIjoxNjI1MTIxMzA4LCJzdWIiOiIiLCJqdGkiOiI2MGRkNjIyMWJlNTI3IiwiZGF0YSI6eyJpZCI6IjQifX0.EbWfqQ7a7EEQDvNjyX500WE1hknkqozm8ehZeVAbAeM'
          },
          msg: 'Login Success'
        }
      } else {
        return {
          code: 0,
          msg: 'Username or Password error!'
        }
      }
    }
  },

  // get user info
  {
    url: '/admin/admin/userinfo',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: "success",
        data: {
          roles: ["admin"],
          id: 4,
          username:"18666666666",
          realname:"Joyboo",
          rid:"1",
          sort:"2",
          extension:{
            gid:"2",
            // newnid:"/statistics/daily", // 打开菜单跳转的页面
            ntcids:"0,2,4",
            status:"1",
            gameids:"0,1,2,3,4"
          },
          instime:"1615960868",
          deltime:"0",
          itime:"2021-03-17 14:01:08",
          name:"系统管理员",
          gamelist: {
            1: '炉石传说',
            2: '和平精英'
          }
        }
      }
    }
  },

  {
    url: '/admin/pub/logout',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: "success",
      }
    }
  }
]

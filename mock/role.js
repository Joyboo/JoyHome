const role = { 1: '系统管理员', 2: '超级管理员', 3: '管理员', 4: '研发组', 5: '测试组', 6: '运营组' }

const mockNids = ['2', '13', '22', '23', '58', '59', '57', '60', '130', '129', '74', '61', '62', '63', '64', '3', '65', '67', '68', '69', '70', '71', '66', '72', '73', '8', '9', '10', '11', '12', '34', '14', '15', '16', '17', '35', '18', '19', '20', '21', '36', '24', '25', '26', '27', '28', '37', '29', '30', '31', '32', '33', '38', '51', '52', '53', '54', '55', '1', '45']

module.exports = [
  {
    url: '/admin/role/childOption',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: role
      }
    }
  }, {
    url: '/admin/role/edit',
    type: 'get',
    response: config => {
      const id = config.query.id
      return {
        code: 1,
        msg: 'success',
        data: {
          data: {
            id: 1,
            name: '超级管理员',
            summary: '拥有最高权限',
            newnids: id == 1 ? ['*'] : mockNids
          }
        }
      }
    }
  }, {
    url: '/admin/role/index',
    type: 'get',
    response: config => {
      const data = []
      for (const i in role) {
        const nids = i == 1 ? ['*'] : mockNids
        data.push({
          id: i,
          name: role[i],
          summary: role[i],
          newnids: nids
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
    url: '/admin/role/add',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  }, {
    url: '/admin/role/del',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  }, {
    url: '/admin/role/edit',
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

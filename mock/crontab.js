module.exports = [
  {
    url: '/admin/crontab/index',
    type: 'get',
    response: config => {
      const size = config.query['pSize'] || 20
      const data = []
      for (let i = size; i > 0; --i) {
        const args = (i % 5 === 0) ? { Joyboo1: '20210714', Joyboo2: 'ok' } : ''
        data.push({
          id: i,
          name: 'Joyboo Crontab - ' + i,
          rule: i + ' ' + (i % 12) + ' * * *',
          rclass: '\\Joyboo\\EasySwoole\\Task\\Crontab',
          eclass: 'Index',
          method: 'test_' + i,
          args: args,
          remark: 'Joyboo remark',
          status: (i % 3) + '',
          instime: '1619604108',
          server: '1',
          sys: '1,2'
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
    url: '/admin/crontab/edit',
    type: 'get',
    response: config => {
      const id = config.query.id || '100'
      const args = (id % 5 === 0) ? { Joyboo1: '20210714', Joyboo2: 'ok' } : ''
      return {
        code: 1,
        msg: 'success',
        data: {
          data: {
            id: id,
            name: 'Joyboo Crontab - ' + id,
            rule: id + ' ' + (id % 12) + ' * * *',
            rclass: '\\Joyboo\\EasySwoole\\Task\\Crontab',
            eclass: 'Index',
            method: 'test_' + id,
            args: args,
            remark: 'Joyboo remark',
            status: (id % 3) + '',
            instime: '1619604108',
            server: [1],
            sys: [1, 2]
          }
        }
      }
    }
  }, {
    url: '/admin/crontab/edit',
    type: 'post',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  }, {
    url: '/admin/crontab/del',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: '操作成功',
        data: []
      }
    }
  }
]

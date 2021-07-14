module.exports = [
  {
    url: '/admin/sysinfo/glbcfg',
    type: 'get',
    response: config => {
      return {
        code: 1,
        msg: 'success',
        data: {
          region_domain: {
            domain: 'https://github.com/Joyboo',
            region: {
              omz: {
                name: '欧美区',
                tzn: '-5',
                tzs: 'America/Bogota'
              },
              xjp: {
                name: '新加坡',
                tzn: '8',
                tzs: 'Asia/Shanghai'
              }
            }
          },
          paginate: {
            cnt_rows: 500,
            list_rows: 20,
            sizelist: [20, 100, 200, 300, 500, 1000, 2000],
            type: 'bootstrap',
            var_page: 'cPage',
            var_pagesize: 'pSize'
          },
          pma: [
            {
              class: 'danger',
              name: '正式版!',
              url: 'https://github.com/Joyboo'
            },
            {
              class: '',
              name: '测试版',
              url: 'https://github.com/Joyboo'
            }
          ]
        }
      }
    }
  }
]

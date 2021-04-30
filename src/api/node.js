import request from '@/utils/request'

export function topmenu(data) {
  return request({
    url: '/admin/node/topmenuVue',
    method: 'get'
  })
}

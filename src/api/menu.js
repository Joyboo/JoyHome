import request from '@/utils/request'

export function topmenu(data) {
  return request({
    url: '/admin/menu/topmenu',
    method: 'get'
  })
}

export function leftmenu(query) {
  return request({
    url: '/admin/menu/leftmenu',
    method: 'get',
    params: query
  })
}

import request from '@/utils/request'

export function rolelist() {
  return request({
    url: '/admin/role/childOption',
    method: 'get'
  })
}

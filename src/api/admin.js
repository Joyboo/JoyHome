import request from '@/utils/request'

export function adminIndex(params) {
  return request({
    url: '/admin/admin/index',
    method: 'get',
    params
  })
}

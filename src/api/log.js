import request from '@/utils/request'

export function logIndex(query) {
  return request({
    url: '/admin/log/index',
    method: 'get',
    params: query
  })
}

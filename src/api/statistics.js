import request from '@/utils/request'

export function statistics(method, query) {
  return request({
    url: '/admin/statistics/' + method,
    method: 'get',
    params: query
  })
}

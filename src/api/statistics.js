import request from '@/utils/request'

export function daily(query) {
  return request({
    url: '/admin/statistics/daily',
    method: 'get',
    params: query
  })
}

import request from '@/utils/request'

export function packageindex(query) {
  return request({
    url: '/admin/package/index',
    method: 'get',
    params: query
  })
}

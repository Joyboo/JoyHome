import request from '@/utils/request'

export function refundIndex(params) {
  return request({
    url: '/admin/google_refund/index',
    method: 'get',
    params
  })
}

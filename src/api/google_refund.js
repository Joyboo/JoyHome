import request from "@/utils/request";

export function refundIndex(params) {
  return request({
    url: '/admin/googleRefund/index',
    method: 'get',
    params
  })
}

import request from '@/utils/request'

export function orderIndex(params) {
  return request({
    url: '/admin/order/index',
    method: 'get',
    params
  })
}

export function orderDetail(params) {
  return request({
    url: '/admin/order/detail',
    method: 'get',
    params
  })
}

// 获取补单参数
export function callBackOrder(data) {
  return request({
    url: '/admin/order/callBackOrder',
    method: 'post',
    data
  })
}

// 发起补单
export function repairOrder(data) {
  return request({
    url: '/admin/order/repairOrder',
    method: 'post',
    data
  })
}

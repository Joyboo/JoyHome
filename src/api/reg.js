import request from '@/utils/request'

export function regIndex(params) {
  return request({
    url: '/admin/reg/index',
    method: 'get',
    params
  })
}

export function regDetail(params) {
  return request({
    url: '/admin/reg/detail',
    method: 'get',
    params
  })
}

export function unbindBack(data) {
  return request({
    url: '/admin/reg/unbindBack',
    method: 'post',
    data
  })
}

// 玩家充值详情
export function payIndex(params) {
  return request({
    url: '/admin/pay/index',
    method: 'get',
    params
  })
}

export function payDetail(params) {
  return request({
    url: '/admin/pay/detail',
    method: 'get',
    params
  })
}

export function loginIndex(params) {
  return request({
    url: '/admin/login/index',
    method: 'get',
    params
  })
}

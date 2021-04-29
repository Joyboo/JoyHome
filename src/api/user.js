import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/pub/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/pub/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

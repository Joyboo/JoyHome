import request from '@/utils/request'

export function whitelistEdit(method, data) {
  const obj = {
    url: '/admin/whitelist/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

export function whitelistIndex(params) {
  return request({
    url: '/admin/whitelist/index',
    method: 'get',
    params
  })
}

export function whitelistAdd(data) {
  const obj = {
    url: '/admin/whitelist/add',
    method: 'post',
    data
  }

  return request(obj)
}


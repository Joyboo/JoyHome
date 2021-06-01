import request from '@/utils/request'

export function sysinfoEdit(method, data) {
  const obj = {
    url: '/admin/sysinfo/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

export function sysinfoIndex(params) {
  return request({
    url: '/admin/sysinfo/index',
    method: 'get',
    params
  })
}

export function sysinfoAdd(data) {
  const obj = {
    url: '/admin/sysinfo/add',
    method: 'post',
    data
  }

  return request(obj)
}

export function sysinfoDel(params) {
  const obj = {
    url: '/admin/sysinfo/del',
    method: 'get',
    params
  }

  return request(obj)
}

export function recache() {
  return request({
    url: '/admin/sysinfo/recache',
    method: 'get'
  })
}

import request from '@/utils/request'

export function rolelist() {
  return request({
    url: '/admin/role/childOption',
    method: 'get'
  })
}

export function roleEdit(method, data) {
  const obj = {
    url: '/admin/role/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

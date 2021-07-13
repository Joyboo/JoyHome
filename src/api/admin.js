import request from '@/utils/request'

export function adminIndex(params) {
  return request({
    url: '/admin/admin/index',
    method: 'get',
    params
  })
}

export function adminEdit(method, data) {
  const obj = {
    url: '/admin/admin/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

export function adminAdd(data) {
  const obj = {
    url: '/admin/admin/add',
    method: 'post',
    data
  }

  return request(obj)
}

export function adminModify(method, data) {
  const obj = {
    url: '/admin/admin/modify',
    method: method
  }
  // get不需要参数
  if (method.toLowerCase() == 'post') {
    obj.data = data
  }

  return request(obj)
}

export function adminToken(params) {
  return request({
    url: '/admin/admin/gettoken',
    method: 'get',
    params
  })
}

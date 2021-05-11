import request from '@/utils/request'

export function packageindex(query) {
  return request({
    url: '/admin/package/index',
    method: 'get',
    params: query
  })
}

// 随机生成key
export function gkey(column) {
  return request({
    url: '/admin/package/gkey',
    method: 'get',
    params: { gkey: column + '§' }
  })
}

export function packageAdd(data) {
  return request({
    url: '/admin/package/add',
    method: 'post',
    data
  })
}

export function packageEdit(method, data) {
  const obj = {
    url: '/admin/package/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

export function packageChildOption(query) {
  return request({
    url: '/admin/package/childOption',
    method: 'get',
    params: query
  })
}

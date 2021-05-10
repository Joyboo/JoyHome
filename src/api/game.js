import request from '@/utils/request'

export function gamelist() {
  return request({
    url: '/admin/game/gamelist',
    method: 'get'
  })
}

export function gameIndex(query) {
  return request({
    url: '/admin/game/index',
    method: 'get',
    params: query
  })
}

export function gameDelete(query) {
  return request({
    url: '/admin/game/del',
    method: 'get',
    params: query
  })
}

export function gkey(column) {
  return request({
    url: '/admin/game/gkey',
    method: 'get',
    params: { gkey: column + '§' }
  })
}

export function gameEdit(method, data) {
  const obj = {
    url: '/admin/game/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

export function gameAdd(data) {
  return request({
    url: '/admin/game/add',
    method: 'post',
    data
  })
}

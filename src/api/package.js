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
    params: {gkey: column + '§'}
  })
}

export function packageAdd(data) {
  return request({
    url: '/admin/package/add',
    method: 'post',
    data
  })
}

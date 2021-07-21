import request from '@/utils/request'

// 发一条
export function errorLogAdd(data) {
  return request({
    url: '/admin/cerror/add',
    method: 'post',
    data
  })
}

// 批量发
export function errorLogMultiple(data) {
  return request({
    url: '/admin/cerror/multiple',
    method: 'post',
    data
  })
}

export function cerrorIndex(params) {
  return request({
    url: '/admin/cerror/index',
    method: 'get',
    params
  })
}

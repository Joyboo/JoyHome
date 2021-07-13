import request from '@/utils/request'

export function errorLogAdd(data) {
  return request({
    url: '/admin/cerror/add',
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

import request from '@/utils/request'

export function googlerefountIndex(query) {
  return request({
    url: '/admin/google_refund_cfg/index',
    method: 'get',
    params: query
  })
}

export function googlerefountEdit(method, data) {
  const obj = {
    url: '/admin/google_refund_cfg/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

export function googlerefountAdd(data) {
  return request({
    url: '/admin/google_refund_cfg/add',
    method: 'post',
    data
  })
}

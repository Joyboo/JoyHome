import request from '@/utils/request'

export function expenseEdit(method, data) {
  const obj = {
    url: '/admin/expense/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

export function expenseIndex(params) {
  return request({
    url: '/admin/expense/index',
    method: 'get',
    params
  })
}

export function expenseAdd(data) {
  const obj = {
    url: '/admin/expense/add',
    method: 'post',
    data
  }

  return request(obj)
}

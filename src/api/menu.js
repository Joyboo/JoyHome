import request from '@/utils/request'

export function getmenu() {
  return request({
    url: '/admin/menu/getmenu',
    method: 'get'
  })
}

// 获取级联选择器数据
export function cascaderTree(query) {
  return request({
    url: '/admin/menu/cascaderTree',
    method: 'get',
    params: query
  })
}

// index页
export function menuIndex(query) {
  return request({
    url: '/admin/menu/index',
    method: 'get',
    params: query
  })
}

export function menuAdd(data) {
  return request({
    url: '/admin/menu/add',
    method: 'post',
    data
  })
}

export function menuEdit(method, data) {
  const obj = {
    url: '/admin/menu/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

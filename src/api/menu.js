import request from '@/utils/request'

export function topmenu(data) {
  return request({
    url: '/admin/menu/topmenu',
    method: 'get'
  })
}

export function leftmenu(query) {
  return request({
    url: '/admin/menu/leftmenu',
    method: 'get',
    params: query
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

export function menuEdit(data) {
  return request({
    url: '/admin/menu/edit',
    method: 'post',
    data
  })
}

export function menuGetOne(query) {
  return request({
    url: '/admin/menu/getOne',
    method: 'get',
    params: query
  })
}

export function menuDelete(query) {
  return request({
    url: '/admin/menu/del',
    method: 'get',
    params: query
  })
}

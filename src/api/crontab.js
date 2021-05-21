import request from "@/utils/request";

export function crontabEdit(method, data) {
  const obj = {
    url: '/admin/crontab/edit',
    method: method
  }
  const key = method.toLowerCase() == 'get' ? 'params' : 'data'
  obj[key] = data

  return request(obj)
}

export function crontabIndex(params) {
  return request({
    url: '/admin/crontab/index',
    method: 'get',
    params
  })
}

export function crontabAdd(data) {
  const obj = {
    url: '/admin/crontab/add',
    method: 'post',
    data
  }

  return request(obj)
}

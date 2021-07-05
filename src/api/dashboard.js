import request from "@/utils/request";

export function dashboard(params) {
  return request({
    url: '/admin/index/dashboard',
    method: 'get',
    params
  })
}

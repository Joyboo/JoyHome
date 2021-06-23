import request from "@/utils/request";

export function adminLogIndex(params) {
  return request({
    url: '/admin/admin_log/index',
    method: 'get',
    params
  })
}

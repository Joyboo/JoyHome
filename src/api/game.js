import request from '@/utils/request'

export function gamelist() {
  return request({
    url: '/admin/game/gamelist',
    method: 'get'
  })
}

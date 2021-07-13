import Cookies from 'js-cookie'
import { isArray, isString } from '@/utils/validate'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  if (!isString(token)) {
    return
  }

  // 对token格式校验
  const arr = token.split('.')
  if (isArray(arr) && arr.length == 3) {
    Cookies.set(TokenKey, token)
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

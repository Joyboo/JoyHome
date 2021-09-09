import { MessageBox } from 'element-ui'

const storageKey = 'joyboo_client_version'

/**
 * 设置
 * @param json
 */
const setStorage = (json) => {
  if (typeof json !== 'object') {
    console.info('version.js setStorage Error: ', typeof json)
    return
  }

  if (!checkStructure(json)) {
    console.info('version.js setStorage structure Error')
    return
  }

  json = JSON.stringify(json)
  window.localStorage.setItem(storageKey, json)
}

/**
 * 获取
 * @returns {[number, null]|[number, Object]}
 */
const getStorage = () => {
  const local = window.localStorage.getItem(storageKey)
  if (typeof local !== 'string') {
    return [1, null]
  }

  const json = JSON.parse(local)
  if (!checkStructure(json)) {
    return [2, null]
  }

  return [0, json]
}

/**
 * 结构是否符合 { later: Number, force: Number }
 * @param version
 * @returns {boolean}
 */
const checkStructure = (version) => {
  return typeof version.force === 'number' && typeof version.later === 'number'
}

/**
 * MessageBox弹窗
 * @param { Object } version
 * @param { Boolean } force true-强制刷新,false-温柔提示刷新
 */
const openBox = (version, force) => {
  const message = force
    ? '发现新版本，请刷新后继续使用'
    : '发现新版本，是否现在刷新？'

  MessageBox({
    title: '版本更新提示',
    message: message,
    confirmButtonText: '立即刷新',
    cancelButtonText: '稍后刷新',
    showClose: !force, // 显示右上角关闭按钮
    showCancelButton: !force, // 显示取消按钮
    closeOnPressEscape: !force, // 通过ESC关闭Box
    closeOnClickModal: !force, // 点击遮罩层关闭Box
    type: force ? 'warning' : 'success'
  }).then(() => {
    setStorage(version)
    window.location.reload()
  }).catch(_ => {
    !force && setStorage(version)
  })
}

/**
 * 检查刷新
 * @param { Object } version
 *    -later: 温和型提示刷新
 *    -force: 强制刷新
 */
export default function clientVersion(version) {
  if (!checkStructure(version)) {
    return
  }

  const [errno, local] = getStorage()
  if (errno !== 0) {
    // 更新本地缓存
    setStorage(version)
    return
  }

  if (local.force !== version.force) {
    openBox(version, true)
  } else if (local.later !== version.later) {
    openBox(version, false)
  }
}

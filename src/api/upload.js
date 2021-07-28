// 获取文件上传的url
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'

export async function uploadJb(uri, params) {
  const file = params.file
  const action = process.env.VUE_APP_BASE_API + uri

  const form = new FormData()
  form.append('file', file)

  const doSend = params => {
    return axios.post(action, params, {
      timeout: 30000,
      timeoutErrorMessage: '上传超时 ^_^',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Token': getToken()
      }
    })
  }

  return await doSend(form)
}

export function uploadHttpRequest(params, { url, size, type }) {
  return new Promise((resolve) => {
    const file = params.file
    const fileType = file.type
    size = size || 2

    if (fileType.indexOf(type || 'image') == -1) {
      ElMessage.error('文件格式错误：' + fileType)
      return
    }
    if (file.size / 1024 / 1024 > size) {
      ElMessage.error('只能上传图片大小小于' + size + 'M')
      return
    }

    uploadJb(url, params)
      .then(resp => {
        const { status, data } = resp
        if (status == 200) {
          ElMessage.success('上传成功')
          resolve(data)
        } else {
          ElMessage.error('上传失败了')
        }
      })
  })
}


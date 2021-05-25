// 获取文件上传的url
import axios from "axios";
import {getToken} from "@/utils/auth";

export async function uploadJb(uri, params) {
  const file = params.file
    , action = process.env.VUE_APP_BASE_API + uri;

  const form = new FormData();
  form.append("file", file);

  const doSend = params => {
    return axios.post(action, params, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Token": getToken()
      }
    })
  }

  return await doSend(form)
}


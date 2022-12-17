import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/storage'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: { 'content-type': 'application/json;charset=UTF-8' },
  timeout: 5000 // 超时时间
})
// 异常拦截处理器
const errorHandler = (error) => {
  const { response } = error
  if (response) {
    // 服务器有返回内容
    let errorMsg = ''
    switch (response.status) {
      case 400:
        errorMsg = '错误请求'
        break
      case 401:
        errorMsg = '未登录,请重新登录'
        store.dispatch('Logout')
        break
      case 404:
        errorMsg = '请求错误，未找到该资源'
        break
      case 405:
        errorMsg = '请求方法有误,请尝试POST/GET'
        break
      case 500:
        errorMsg = '服务器出错'
        break
      case 502:
        errorMsg = '网络错误'
        break
      case 503:
        errorMsg = '服务不可用'
        break
      default:
        errorMsg = '连接错误'
    }
    Message.error(errorMsg)
  }
  return Promise.reject(error)
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求头 token
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    return config
  }, errorHandler)

// 响应拦截器 code根据实际项目而定
service.interceptors.response.use(response => {
  if (response.data.code === '50008') { // 50008为登录过期code
    Message.error(response.data.message || '登录过期')
    // 返回登录页
    return router.push({ name: 'login' })
  }
  // 其他错误
  if (response.data.code !== 20000) {
    Message.error(response.data.message || 'Error')
    return Promise.reject(new Error(response.data.message || 'Error'))
  }

  return response.data
}, errorHandler)

/**
 * @name get请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * @name post请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default { get, post }

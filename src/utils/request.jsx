import axios from 'axios'
import { getToken } from '.'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义的配置
request.interceptors.request.use(
  // 在请求发送之前携带token

  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
// 在请求响应之后 做拦截 处理返回的数据
request.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export { request }

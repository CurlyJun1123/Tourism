/**
 * @version 3.0.5
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-3.0.4 alpha-3.0.4
 */

import Request from '@/utils/luch-request/index.js'

const getTokenStorage = () => {
  let token = ''
  try {
    token = uni.getStorageSync('token')
  } catch (e) {
    console.log(e)
  }
  return token
}

const http = new Request()

http.setConfig((config) => {
  /* 设置全局配置 */
  config.baseURL = 'http://8.134.9.215/prod-api' /* 根域名不同 */
  config.header = { ...config.header }
  return config
})

http.interceptors.request.use(
  (config) => {
    /* 请求之前拦截器。可以使用async await 做异步操作 */
    config.header = {
      ...config.header,
      Authorization: 'Bearer ' + getTokenStorage()
    }

    // if (!token) {
    //   // 如果token不存在，return Promise.reject(config) 会取消本次请求
    //   return Promise.reject(config)
    // }

    return config
  },
  (config) => {
    return Promise.reject(config)
  }
)

http.interceptors.response.use(
  async (response) => {
    /* 请求之后拦截器。可以使用async await 做异步操作  */
    // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    //   return Promise.reject(response)
    // }
    return response.data.data
  },
  (response) => {
    // 请求错误做点什么。可以使用async await 做异步操作
    console.log(response)
    return Promise.reject(response)
  }
)

export default http

import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
import store from '@/store'

function timeout() {
  // 当前时间戳
  const currentTime = Date.now()
  // 获取token时的时间戳
  const tokenTime = getTokenTime()
  // token过期时间
  const timeout = 2 * 60 * 60 * 1000
  // 如果当前时间戳 - 获取token时的时间戳 > token过期时间
  return currentTime - tokenTime > timeout
}

// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use(async (config) => {
  // 判断vuex中是否有token
  if (store.state.user.token) {
    // token过期
    if (timeout()) {
      // 跳转到登录页
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录失效'))
    } else {
      // token未过期
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
  }
  return config
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error?.response?.status === 401) {
      Message.error('登录失效')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }

    return Promise.reject(error)
  },
)
export default service // 导出axios实例

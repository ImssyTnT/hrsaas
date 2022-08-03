import { login, getUserInfoApi, getUserDetailInfo } from '@/api'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    // 登录获取token
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userDetailInfo = await getUserDetailInfo(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userDetailInfo })
    },
    // 退出登录
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    },
  },
}

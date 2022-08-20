import { login, getUserInfoApi, getUserDetailInfo } from '@/api'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'

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

      // actions内部可以通过return将数据传递出去,类似then中的return
      return userBaseInfo
    },
    // 退出登录
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter()
      context.commit('permission/setRoutes', [], { root: true })
    },
  },
}

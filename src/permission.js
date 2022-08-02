import router from '@/router'
import store from '@/store'

// 全局路由前置守卫
// 会在全局路由进入之前触发
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    // 发起获取用户信息请求
    if (!store.state.user.userInfo.userId) {
      store.dispatch('user/getUserInfo')
    }

    // 1.登录
    // 判断是否去往登录页面
    // 如果是 强制跳转到主页
    if (to.path === '/login') return next('/')
    // 如果不是 放行
    next()
  } else {
    // 2.未登录
    // 判断去往的页面是否在白名单内
    const isCludes = whiteList.includes(to.path)
    // 如果在 放行
    if (isCludes) return next()
    // 如果不在 强制跳转到登录页面
    next('/login')
  }
})

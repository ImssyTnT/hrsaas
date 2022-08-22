import router, { constantRoutes, asyncRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [], // 自己维护的路由规则( 静态路由 + 筛选后的动态路由 )
    points: [], // 员工按钮权限
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, points) {
      state.points = points
    },
  },
  actions: {
    filterRoutes(context, roles) {
      // 通过用户路有权限对动态路由进行筛选
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      // 将路由储存在vuex中
      context.commit('setRoutes', routes)
      // 将员工按钮权限储存在vuex中
      context.commit('setPoints', roles.points)
      // 添加动态路由
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
  },
}

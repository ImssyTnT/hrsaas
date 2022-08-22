import permissionPoint from '@/constant/permission'

// 可以定义一个对象,该对象最终会混入到组件当中
// 组件有的,这个对象都可以有,组件没有的这个对象不能有
export default {
  data() {
    return {
      point: permissionPoint,
    }
  },
  methods: {
    isHas(point) {
      return this.$store.state.permission.points.includes(point)
    },
  },
}

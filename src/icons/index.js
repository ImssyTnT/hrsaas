import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// 全局注册 svg-icon 组件
Vue.component('svg-icon', SvgIcon)

// 加载 /svg 目录下左右 .svg 后缀名的文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

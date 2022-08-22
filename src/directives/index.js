// 自定义指令文件夹

export const imgError = {
  // 当被绑定的元素插入到dom中时
  inserted(el, binding) {
    // 监听dom img图片加载失败的事件
    if (!el.src) {
      el.src = binding.value
    } else {
      el.onerror = () => {
        el.src = binding.value
      }
    }
  },
  // 指令所绑定的元素更新时触发
  update(el, binding) {
    if (!el.src) {
      el.src = binding.value
    }
  },
}

import store from '@/store'

export const isHas = {
  // bind:指令和dom绑定
  // inserted:绑定的元素插入到父节点
  // update:指令所绑定的Vnode
  inserted(el, binding) {
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  },
}

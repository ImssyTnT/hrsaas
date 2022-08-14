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

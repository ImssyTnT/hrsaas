import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

// 注册components文件夹中所有的组件并导出
const components = [PageTools, UploadExcel]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}

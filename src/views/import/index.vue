<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :beforeUpload="excelSuccess" :onSuccess="onSuccess" />
    </div>
  </div>
</template>

<script>
import { importEmployees } from '@/api'
import { formatTime } from '@/filters'
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    // 文件上传事件
    excelSuccess(file) {
      // 上传文件的最大值
      const maxSize = false
      // 判断文件是否以 .xlsx 结尾  endsWith方法用来判断以什么字段结尾
      if (!file.name.endsWith('.xlsx')) {
        return this.$message.error('请上传.xlsx结尾的文件')
      }
      // 该方法想继续上传文件需要return一个true
      return true
    },
    // 文件上传成功后会触发该事件
    async onSuccess({ header, results }) {
      // 该方法会将excel文件解析成 header和results
      // header为表头
      // results为内容

      // 将数据处理成后端所需要的格式
      // map:循环一个数组,得到一个新数组,新数组和循环的数组长度一致,此时建议用map
      const newArr = results.map((item) => {
        const obj = {}
        for (let k in importMapKeyPath) {
          // 将excel事件戳转换成js时间戳
          if (k === '入职日期' || k === '转正日期') {
            // excel时间戳
            const timestamp = item[k]
            // js时间戳
            const date = new Date((timestamp - 1) * 24 * 60 * 60 * 1000)
            // 由于excel时间戳是从1900年开始 而js时间戳是从1970年开始
            // 所以需要将转换的js时间戳减去70年
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[k]] = formatTime(data)
          } else {
            obj[importMapKeyPath[k]] = item[k]
          }
        }
        return obj
      })
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.go('-1')
    },
  },
}
</script>

<style scoped></style>

<template>
  <div id="main" class="radarEchars"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},

  mounted() {
    this.initEcharts()
  },

  methods: {
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      const randerOption = {
        title: {
          text: '基础雷达图',
        },
        legend: {
          data: ['樊合肥', '田志强'],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 100 },
            { name: '技术', max: 100 },
            { name: '管理', max: 100 },
            { name: '分享', max: 100 },
            { name: 'bug', max: 100 },
            { name: '助人', max: 100 },
          ],
          splitLine: {
            // 每一圈的颜色
            lineStyle: {
              color: ['red', 'green'].reverse(),
            },
          },
          axisLine: {
            // 交叉线颜色
            lineStyle: {
              color: 'blue',
            },
          },
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [12, 44, 66, 33, 23, 22],
                name: '樊合肥',
              },
              {
                value: [45, 100, 55, 12, 88, 99],
                name: '田志强',
              },
            ],
          },
        ],
      }
      myChart.setOption(randerOption)
    },
  },
}
</script>

<style scoped lang="scss">
.radarEchars {
  width: 690.7px;
  height: 500px;
}
</style>

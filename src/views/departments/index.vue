<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部区域 Start   -->
        <tree-tools :treeNode="company" :isRoot="true"></tree-tools>
        <!-- 头部区域 End   -->

        <!-- 树形区域 Start -->
        <el-tree :data="treeDate" default-expand-all :props="defaultProps">
          <template v-slot="{ data }">
            <tree-tools :treeNode="data"></tree-tools>
          </template>
        </el-tree>
        <!-- 树形区域 End -->
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
export default {
  data() {
    return {
      // 树形区域数据
      treeDate: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }],
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' },
      ],
      // 树形区域配置
      defaultProps: {
        label: 'name',
      },
      company: { name: '传智教育', manager: '负责人' },
    }
  },

  components: {
    TreeTools,
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="less"></style>

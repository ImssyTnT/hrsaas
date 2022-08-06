<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading" class="box-card">
        <!-- 头部区域 Start   -->
        <tree-tools
          :treeNode="company"
          :isRoot="true"
          @add="showAddDept"
        ></tree-tools>
        <!-- 头部区域 End   -->

        <!-- 树形区域 Start -->
        <el-tree :data="treeDate" default-expand-all :props="defaultProps">
          <template v-slot="{ data }">
            <tree-tools
              @remove="loadDepts"
              @add="showAddDept"
              :treeNode="data"
              @edit="editShow"
            ></tree-tools>
          </template>
        </el-tree>
        <!-- 树形区域 End -->
      </el-card>
    </div>
    <!-- 部门弹层 Start -->
    <add-dept
      ref="addDept"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @remove="loadDepts"
    />
    <!-- 部门弹层 End -->
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api'
import { transListToTree } from '@/utils/index.js'
import AddDept from './components/add-dept.vue'
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
      dialogVisible: false,
      currentNode: {},
      loading: false,
    }
  },

  components: {
    TreeTools,
    AddDept,
  },

  created() {
    this.loadDepts()
  },

  methods: {
    // 获取组织结构,将数据处理成树形结构
    async loadDepts() {
      this.loading = true
      const res = await getDeptsApi()
      this.treeDate = transListToTree(res.depts, '')
      this.loading = false
    },
    // 树形数据返回信息
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    editShow(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    },
  },
}
</script>

<style scoped lang="less"></style>

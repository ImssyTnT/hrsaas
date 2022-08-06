<template>
  <el-row type="flex" style="width: 100%">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="5">
      <el-row type="flex">
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- 下拉菜单 -->
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('add', treeNode)"
                >添加子部门</el-dropdown-item
              >
              <template v-if="!isRoot">
                <el-dropdown-item @click.native="$emit('edit', treeNode)"
                  >编辑部门</el-dropdown-item
                >
                <el-dropdown-item @click.native="onRemove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptsApi } from '@/api'
export default {
  data() {
    return {}
  },

  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },

  created() {},

  methods: {
    // 删除部门
    async onRemove() {
      try {
        await this.$confirm('您是否确定要删除该部门?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        await delDeptsApi(this.treeNode.id)
        this.$message.success('删除成功')
        this.$emit('remove')
      } catch (error) {}
    },
  },
}
</script>

<style scoped></style>

<template>
  <el-dialog
    title="角色分配"
    @open="onOpen"
    @close="onClose"
    :visible="visible"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi, getUserDetailInfo, assignRoles } from '@/api'
export default {
  data() {
    return {
      checkList: [],
      roles: [],
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },

  created() {},

  methods: {
    // 关闭弹层事件
    onClose() {
      this.$emit('update:visible', false)
    },

    // 获取角色列表
    async getRolesList() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    // 监听对话框打开
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    // 获取员工角色
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetailInfo(this.userId)
      this.checkList = roleIds
    },
    // 分配角色
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      console.log(this.checkList)
      await assignRoles({ id: this.userId, roleIds: this.checkList })
      this.$message.success('分配成功')
      this.onClose()
    },
  },
}
</script>

<style scoped></style>

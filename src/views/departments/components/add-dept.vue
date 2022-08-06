<template>
  <el-dialog :title="loadTitle" @close="onClose" :visible="visible" width="40%">
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择部门负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="请输入部门介绍"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  getEmployeesApi,
  postDeptApi,
  getDeptById,
  editDeptApi,
} from '@/api'
export default {
  data() {
    // 部门名称校验规则
    const checkDeptName = async (rule, value, callback) => {
      let isRepeat
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id,
          )
          .some((item) => item.name === this.formData.name)
      } else {
        // 判断value 是否 和添加的统计部门是否重复
        if (!this.currentNode.children) return callback()
        isRepeat = this.currentNode.children.some((item) => item.name === value)
      }

      isRepeat ? callback(new Error('部门重复')) : callback()
    }
    // 部门编码校验规则
    const checkDeptCode = async (rule, value, callback) => {
      let isRepeat
      const { depts } = await getDeptsApi()
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }

      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: '', // 部门介绍
      },
      formRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入部门名称' },
          { validator: checkDeptName, trigger: 'blur' },
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入部门名称' },
          { validator: checkDeptCode, trigger: 'blur' },
        ],
        manager: [
          { required: true, trigger: 'change', message: '请输入部门名称' },
        ],
        introduce: [
          { required: true, trigger: 'blur', message: '请输入部门名称' },
        ],
      },
      employees: {},
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getEmployees()
  },

  methods: {
    // 获取员工基本列表
    async getEmployees() {
      const res = await getEmployeesApi()
      this.employees = res
    },
    // 关闭弹窗
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: '', // 部门介绍
      }
    },
    // 点击确定 添加部门
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      try {
        if (this.formData.id) {
          await editDeptApi(this.formData)
          this.$message.success('编辑部门成功')
          this.onClose()
          this.$emit('remove')
        } else {
          await postDeptApi(this.formData)
          this.$message.success('添加部门成功')
          this.onClose()
          this.$emit('remove')
        }
      } catch (error) {
        this.$message.error('操作部门失败')
      }
    },
    // 根据id获取部门详情
    async getDeptById(id) {
      this.formData = await getDeptById(id)
    },
  },

  computed: {
    loadTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
}
</script>

<style scoped></style>

<template>
  <el-dialog title="提示" :visible="Visible" width="50%" @close="onClose">
    <!-- 表单 -->
    <el-form :model="formData" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in formData.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option
        ></el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
        /> -->
        <el-select
          v-model="formData.departmentName"
          placeholder="请选择部门"
          @focus="getDetps"
          ref="deptsSelect"
        >
          <el-option value="" v-loading="treeLoading">
            <el-tree
              :data="depts"
              :props="treeDepts"
              @node-click="treeDeptsClick"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="addEmployees">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import employees from '@/constant/employees'
import { getDeptsApi, addEmployees } from '@/api'
import { transListToTree } from '@/utils'
const { hireType } = employees
export default {
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: '',
        hireType,
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位',
          },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' },
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' },
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
      },
      depts: [],
      treeDepts: {
        label: 'name',
      },
      treeLoading: false,
    }
  },

  props: {
    Visible: {
      type: Boolean,
      required: true,
    },
  },

  created() {},

  methods: {
    // 获取部门数据
    async getDetps() {
      this.treeLoading = true
      const { depts } = await getDeptsApi()
      this.depts = transListToTree(depts, '')
      this.treeLoading = false
    },
    // 点击获取部门名称
    treeDeptsClick(row) {
      this.formData.departmentName = row.name
      this.$refs.deptsSelect.blur()
    },
    // 点击确定添加员工信息
    addEmployees() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addEmployees(this.formData)
        this.onClose()
        this.$message.success('添加成功')
        this.$emit('addSuccess')
      })
    },
    // 关闭弹层
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
    },
  },
}
</script>

<style scoped lang="scss">
.el-select {
  width: 50%;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
.el-select-dropdown__item {
  overflow: unset;
  height: 100%;
}
</style>

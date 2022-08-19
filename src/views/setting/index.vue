<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="dialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button size="small" type="success" @click="showRightsDialog"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :page-sizes="[2, 5, 10, 20]"
            layout="total,sizes,prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 弹出层 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      @close="onClose"
    >
      <el-form
        :model="roleForm"
        :rules="roleRules"
        ref="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.region"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 角色分配权限 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightsDialog"
      width="50%"
    >
      <el-tree
        :data="permissions"
        :props="{ label: 'name' }"
        :default-expand-all="true"
        :show-checkbox="true"
        node-key="id"
        :default-checked-keys="defaultCheckKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesApi,
  addRoles,
  delRole,
  getCompanyInfoApi,
  getPrimissionList,
} from '@/api'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      dialogVisible: false,
      roleForm: {
        name: '',
        region: '',
      },
      roleRules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
        ],
      },
      companyInfo: {},
      setRightsDialog: false,
      permissions: [],
      defaultCheckKeys: ['1', '1063315016368918528'], // 权限分配选择项
    }
  },

  created() {
    this.getRolesList()
    this.getCompanyInfo()
    this.getPermissions()
  },

  methods: {
    // 获取表格列表数据
    async getRolesList() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      this.tableData = rows
      this.total = total
    },
    // 分页切换功能
    currentChange(val) {
      this.page = val
      this.getRolesList()
    },
    // 分页 每页显示条数功能
    handleSizeChange(val) {
      this.pageSize = val
      this.getRolesList()
    },

    // 弹出层关闭事件
    onClose() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      this.roleForm.region = ''
    },

    // 弹出层确定按钮
    async addRole() {
      await this.$refs.form.validate()
      await addRoles(this.roleForm)
      this.$message.success('添加成功')
      this.onClose()
      this.getRolesList()
    },

    // 删除角色
    async delRole(row) {
      await delRole(row.id)
      this.$message.success('删除成功')
      this.getRolesList()
    },

    // 获取公司信息
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
      this.companyInfo = res
    },
    // 分配权限弹层
    showRightsDialog() {
      this.setRightsDialog = true
    },
    // 获取权限列表
    async getPermissions() {
      const res = await getPrimissionList()
      const treePermission = transListToTree(res, '0')
      console.log(treePermission)
      this.permissions = treePermission
    },
  },
}
</script>

<style scoped>
.el-alert--info.is-light {
  margin-bottom: 20px;
}
</style>

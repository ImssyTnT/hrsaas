<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="dashboard-container">
        <div class="app-container">
          <el-card>
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
              <el-tab-pane name="account" label="登录账户设置">
                <!-- 放置表单 -->
                <el-form
                  label-width="120px"
                  style="margin-left: 120px; margin-top: 30px"
                >
                  <el-form-item label="姓名:">
                    <el-input
                      v-model="fromData.username"
                      style="width: 300px"
                    />
                  </el-form-item>
                  <el-form-item label="密码:">
                    <el-input
                      v-model="fromData.password"
                      style="width: 300px"
                      type="password"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="updateUserDetailInfo"
                      >更新</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane name="userDetail" label="个人详情">
                <UserInfo></UserInfo>
              </el-tab-pane>
              <el-tab-pane name="employeesInfo" label="岗位信息" />
            </el-tabs>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetailInfo, updateUserDetailInfo } from '@/api'
import Cookies from 'js-cookie'
import UserInfo from './components/user-info.vue'
export default {
  data() {
    return {
      fromData: {},
      activeName: Cookies.get('employeesDetail') || 'account',
    }
  },

  created() {
    this.getUserDetailInfo()
  },

  components: {
    UserInfo,
  },

  methods: {
    // 获取员工基本信息
    async getUserDetailInfo() {
      const res = await getUserDetailInfo(this.$route.params.id)
      this.fromData = res
    },
    // 更新员工基本信息
    async updateUserDetailInfo() {
      await updateUserDetailInfo(this.fromData)
      this.$message.success('修改成功')
    },
    // tab栏切换持久化处理
    handleTabClick() {
      console.log(this.activeName)
      Cookies.set('employeesDetail', this.activeName)
    },
  },
}
</script>

<style scoped></style>

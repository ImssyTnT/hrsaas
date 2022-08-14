<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="showAdd"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="tableData">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
                :style="{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  padding: '10px',
                }"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatValue"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <!-- 利用过滤器格式化时间 -->
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            @current-change="currentChange"
            :page-size="pages.size"
            :total="total"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>

    <!-- 弹出层 -->
    <AddEmployees :Visible.sync="addShow" @addSuccess="getEmployeesList">
    </AddEmployees>
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployeeApi } from '@/api'
import AddEmployees from './components/AddEmployees.vue'
import employees from '@/constant/employees'
export default {
  name: 'employees',
  data() {
    return {
      tableData: [],
      pages: {
        page: 1,
        size: 10,
      },
      total: 0,
      addShow: false,
    }
  },

  created() {
    this.getEmployeesList()
  },

  components: {
    AddEmployees,
  },

  methods: {
    // 获取员工列表
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.tableData = rows
      this.total = total
    },
    // 分页功能
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    // 将数据格式化
    formatValue(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    // 删除员工
    async delEmployee(id) {
      try {
        await this.$confirm('是否删除该员工?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        await delEmployeeApi(id)
        this.$message.success('删除成功')
        this.getEmployeesList()
      } catch (error) {}
    },
    // 点击新增员工显示弹出层
    showAdd() {
      this.addShow = true
    },
  },
}
</script>

<style scoped lang="less"></style>

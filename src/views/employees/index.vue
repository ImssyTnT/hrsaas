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
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
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
                @click="showErCodeDialog(row)"
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
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
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

    <!-- 头像二维码弹层 -->
    <el-dialog
      title="头像二维码"
      :visible.sync="dialogShow"
      width="30%"
      class="qrcode"
    >
      <canvas id="canvas"></canvas>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployeeApi } from '@/api'
import AddEmployees from './components/AddEmployees.vue'
import employees from '@/constant/employees'
import QRcode from 'qrcode'
const { exportExcelMapPath, hireType } = employees
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
      dialogShow: false,
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
    // 导出功能
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel.js')
      // 获取所有员工列表
      const { rows } = await getEmployeesInfoApi({
        page: '1',
        size: this.total,
      })
      // 利用Object.keys把对象转换成数组
      // 获取excel表头数据
      const header = Object.keys(exportExcelMapPath)
      // 获取excel表格内容数据
      // 将数据处理成excel表格需要的数据
      const data = rows.map((item) => {
        // data数据格式是二维数组 需要根据表头数据处理 内容的数据
        // item为data中的每一项 根据 路径映射表 中 header 的字段匹配数据
        return header.map((h) => {
          if (h === '聘用形式') {
            const arr = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return arr ? arr.value : '未知'
          }
          return item[exportExcelMapPath[h]]
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
    // 点击显示头像二维码
    showErCodeDialog(row) {
      if (!row.staffPhoto) return this.$message.error('该用户未设置头像')
      this.dialogShow = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, row.staffPhoto)
      })
    },
  },
}
</script>

<style lang="scss">
.qrcode {
  .el-dialog__body {
    display: flex;
    justify-content: center;
  }
}
</style>

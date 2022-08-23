<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="updateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="currentMonth" @change="updateCalendar">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{ date }">
        <div class="cellbox">
          <span class="text"> {{ date.getDate() }}</span>
          <span class="week" v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      years: [],
      currentDate: '',
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    // 初始化日历时间
    initCalendar() {
      const data = new Date()
      this.currentYear = data.getFullYear()
      this.currentMonth = data.getMonth() + 1
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i)
      this.currentDate = data
    },
    // 周末显示休息
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    // 更新日历
    updateCalendar() {
      this.currentDate = `${this.currentYear}-${this.currentMonth}`
    },
  },
}
</script>

<style scoped lang="scss">
.el-col-3 {
  margin-left: 10px;
}
::v-deep.el-select {
  height: 32px;
  .el-input {
    height: 100%;
  }
  .el-input__inner {
    height: 100%;
  }
  .el-input__icon {
    line-height: 32px;
  }
}
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar-table td {
  border: unset;
}
::v-deep .el-calendar-table tr td:first-child {
  border: unset;
}
::v-deep .el-calendar-table tr:first-child td {
  border: unset !important;
}
::v-deep .el-calendar-day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  .text {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
  }
  .week {
    display: inline-block;
    margin-left: 10px;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    background-color: #fa7c4d;
    font-size: 12px;
    border-radius: 50%;
  }
}
</style>

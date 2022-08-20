<template>
  <el-card class="box-card">
    <el-row type="flex">
      <!-- 左边 -->
      <el-col>
        <el-tag v-if="isShowLeft">
          <i :class="leftIcon"></i>
          <slot name="left" />
        </el-tag>
      </el-col>
      <!-- 右边 -->
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'page-tools',
  data() {
    return {}
  },

  created() {},

  methods: {},

  props: {
    leftIcon: {
      type: String,
      default: 'el-icon-info',
    },
    isShowLeft: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped>
.box-card {
  margin: 20px 0;
}
</style>

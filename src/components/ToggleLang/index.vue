<template>
  <el-dropdown @command="commandLanguage" trigger="click">
    <span class="el-dropdown-link">
      <svg-icon className="language" iconClass="language"></svg-icon>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(value, key) in messages"
        :key="key"
        :disabled="key === $i18n.locale"
        :command="key"
        >{{ value.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
import { messages } from '@/i18n'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages,
    }
  },

  created() {},

  methods: {
    // 切换语言
    commandLanguage(val) {
      this.$i18n.locale = val
      Cookie.set('lang', val)
      this.$router.go(0)
    },
  },
}
</script>

<style scoped lang="scss">
.language {
  font-size: 20px;
  color: #fff;
}
</style>

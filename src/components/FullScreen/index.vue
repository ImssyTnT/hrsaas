<template>
  <div>
    <svg-icon
      @click="onFullScreen"
      className="fullscreen"
      iconClass="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>

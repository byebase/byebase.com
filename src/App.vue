<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() { // 注册一个方法
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
    window.addEventListener('error', (msg) => {
      if (msg.message == "Uncaught SyntaxError: Unexpected token '<'" && msg.filename.indexOf('js/chunk-') >= 0) {
        window.location.reload()
      }
      return true;
    }, true);
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        setTimeout(_=>{
          this.isRouterAlive = true
        },100)
      })
    }
  }
}
</script>
<style scoped lang="less" >

</style>

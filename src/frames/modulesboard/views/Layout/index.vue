<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:37:53
 * @ Description: 主页
 -->

<template>
  <div :class="['app-wrapper', inMain ? 'bg' : '']">
    <Navbar />
    <div class="content-wrapper">
      <app-main class="container" />
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar
  },
  computed: {
    // 是否是主页
    inMain() {
      return this.$route.path === '/menu'
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .content-wrapper {
    // height: calc(100% - 50px);
    height: calc(100%);
    width: 100%;
    display: flex;
    justify-content: flex-start;

    .container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

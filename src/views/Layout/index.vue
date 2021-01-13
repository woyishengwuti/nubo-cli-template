<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 11:15:44
 * @ Description: 主页
 -->

<template>
  <div :class="['app-wrapper']">
    主页
    <el-button @click="entry">下一级</el-button>
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
    Navbar,
    AppMain
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    entry() {
      this.$router.push({
        path: '/main/test'
      })
    }
  }
}
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>

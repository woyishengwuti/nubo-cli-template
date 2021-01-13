<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:51:36
 * @ Description: 头部导航
 -->

<template>
  <section class="app-main">
    <div class="app-container">
      <router-view :key="key" class="" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  components: {},
  data() {
    return {

    }
  },
  computed: {
    // 唯一值
    key() {
      return this.$route.path
    }
  },
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.app-main {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .app-container {
    width: 100%;
    height: 100%;
  }
}
</style>

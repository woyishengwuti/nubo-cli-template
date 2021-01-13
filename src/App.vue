<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-01-08 11:17:18
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 11:09:04
 * @ Description: 统一处理所有文件
 -->

<template>
  <div id="app" :class="locale !== 'cn' ? 'en-family' : 'cn-family'">
    <router-view />
  </div>
</template>

<script>
// import CallBack from '@/utils/callback.js'
// import WebSocketClass from '@/utils/socket'
import RouterStatic from '@/router/router-view'

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      routerWrap: [],
      UnlockTimeVisible: false, // 门锁提示弹出层
      UnlockTimeTer: [], // 门锁提示数据
      isTips: false // 是否需要提示了
    }
  },
  computed: {
    locale() {
      // 本地存储的语言类型
      return this.$store.state.core.locale
    }
  },
  watch: {
    locale(val, oldVal) {
      // 语言变化
      console.error('语言切换', val)
      this.$Moment.locale(val)

      if (val === 'en-us') {
        this.$i18n.locale = 'en-us'
      } else if (val === 'zh-cn') {
        this.$i18n.locale = 'zh-cn'
      } else if (val === 'zh-tw') {
        this.$i18n.locale = 'zh-tw'
      }
    }
  },
  created() {
    this.$Moment.locale(this.locale)

    // 添加路由
    this.$router.addRoutes(RouterStatic)
  },
  mounted() {

  },
  methods: {
    // 切换语言
    changeLocale(localeval) {
      this.$store.commit('SET_LOCALE', localeval)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/reset.scss";
@import "@/styles/index.scss";

#app {
	// font-family: $font-family, $bold-font-family, $sub-font-family, $reg-font-family;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .text-btn {
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>

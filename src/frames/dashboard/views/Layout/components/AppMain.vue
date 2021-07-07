<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-07-05 14:56:32
 * @ Description: 头部导航
 -->

<template>
  <section class="app-main">
    <div class="app-container">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" class="" />
      </transition>
    </div>
  </section>
</template>

<script>
import api from '@dashboard/api/api'
import Bus from '@dashboard/event/bus'
import { resetRouter } from '@core/router/router'

export default {
  name: 'AppMain',
  components: {},
  data() {
    return {
      systemName: '',
      sSystemList: [],
      resetPassVisible: false,
      userInfo: {} // 登录人信息
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
    // 优先获取子系统信息 - 暂时没这个接口信息
    // this.getSystemList()
  },
  mounted() {

  },
  methods: {
    // 获取登录信息
    getCurrentUser() {
      api.getCurrentUser().then(res => {
        if (res.result) {
          this.userInfo = res.data
          // 提交信息
          this.$store.commit('login/SET_USERINFO', res.data)
        }
      })
    },
    // 获取用户注册子系统
    async getSystemList() {
      await api.getUserHasList({
        user: this.$store.state.userInfo.sAccount
      }).then(res => {
        if (res.result) {
          this.sSystemList = res.data.filter(v => v.iState === 1)

          const iSystemId = localStorage.getItem('iSystemId')

          // 切换子系统的时候先存在本地
          // 如果本地存在 那么直接取本地值
          if (iSystemId) {
            this.$store.commit('modules/SET_SYSTEMID', iSystemId)
            this.systemName = this.sSystemList.filter(v => String(v.iSystemId) === String(iSystemId))[0].sSystemName || ''

            // 由于这里存下来了 导致那边的watch不会触发 无法加载菜单信息
          } else {
            this.systemName = this.sSystemList[0].sSystemName || ''
            this.$store.commit('modules/SET_SYSTEMID', this.sSystemList[0].iSystemId || '')
          }

          // 这个时候才能加载菜单信息
          // console.error('注册子系统加载完成加载菜单信息', this.sSystemList, iSystemId)
          Bus.$emit('loadMenu')
        } else {
          this.sSystemList = []
        }
      })
    },
    // 子系统选择
    handleMenuClick(e) {
      // console.log('子系统选择 - id', e.key)
      this.$store.commit('app/SET_SYSTEMID', e.key)

      // 卸载modules模块的内vuex 主页和登录的不卸载
      // 卸载完重新获取菜单信息
      const modules = this.$store._modules.root._children
      const modulesKeys = Object.keys(modules)
      modulesKeys.forEach(v => {
        // 卸载当前所有vuex模块 - arr是不卸载的
        const arr = ['core', 'permission', 'app', 'login']
        if (!arr.includes(v)) this.$store.unregisterModule(v)
      })

      // 卸载vue-router信息
      resetRouter()

      // 加载菜单即可
      this.$store.commit('SET_ISINIT', false)
      Bus.$emit('loadMenu', true)
    }
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

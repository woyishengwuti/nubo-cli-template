<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-05-08 10:13:46
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 11:02:10
 * @ Description: 宫格式菜单
 -->

<template>
  <div class="menu-wrap" />
</template>

<script>
import _import from '@/scripts/_import'
import RouterStatic from '@/router/router-view'
import { getMenus } from '@/api/frame'

export default {
  name: 'Menu',
  components: {

  },
  mixins: [],
  data() {
    return {
      childRouter: [] // 菜单信息
    }
  },
  computed: {
    // 初始化
    isInit() {
      return this.$store.state.core.isInit
    }
  },
  watch: {},
  created() {},
  mounted() {
    if (!this.isInit) {
      this.GetMeuns()
    }
  },
  destroyed() {},
  methods: {
    // 获取菜单 这里可以使用测试数据
    async GetMeuns() {
      const res = await getMenus()
      const menus = res.data

      // 设置侧边栏信息 树状结构
      this.$store.commit('SET_MENUS', menus)

      // APP.vue中保存下来的信息
      this.childRouter = RouterStatic.filter(item => item.path === '/main')

      // 初始化菜单
      this.initMenus(menus)
    },
    // 初始化菜单
    async initMenus(menus) {
      for (const modules of menus) {
        // 对每个子菜单进行处理
        this.deepTraversal(modules)
      }

      // 注册完成
      this.$store.commit('SET_ISINIT', true)
    },
    // 菜单处理
    async deepTraversal(modules) {
      // 获取模块 / 异步获取 -> 导致合并静态路由会出问题 -> 递归获取每个子页面
      if (modules) {
        // 处理事件
        // 由于终端模块大部分都是一级菜单，所以这里只处理一级菜单modules.children.length === 0信息
        // 和二级菜单下modules.children不存在的信息
        if (!modules.children || modules.children.length === 0) {
          // 只处理子元素
          const p = await _import('modules', modules.folder)

          // 路由 如果菜有四个路由 文件夹内部又存在另外的路由 则进行合并
          this.childRouter[0].children = p.router.concat(p.routerStatic)

          // 热更新导致重复加入
          this.$router.addRoutes(this.childRouter)

          // Store
          for (const name in p.store) {
            this.$store.registerModule(name, p.store[name])
          }
        }

        const children = modules.children
        if (children) {
          for (let i = 0; i < children.length; i++) {
            this.deepTraversal(children[i])
          }
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .menu-wrap {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 13:37:11
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:31:11
 * @ Description: 导航栏
 -->

<template>
  <div class="nav-bar-wrapper">
    <div class="nav-bar">
      主页
    </div>
  </div>
</template>

<script>
import { resetRouter } from '@core/router/router'
import { getMenus } from '@core/api/frame'
// import api from '@transboard/api/api'
import _import from '@transboard/scripts/_import'
// import Bus from '@transboard/event/bus'

export default {
  name: 'Navbar',
  components: {},
  props: {},
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  beforeCreate() {},
  created() {
    // 获取登录信息
  },
  beforeMount() {},
  mounted() {
    // 初始化侧边栏数据
    if (!this.isInit) {
      this.GetMeuns()
    }
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    // 退出
    logout() {
      sessionStorage.removeItem('token')
      localStorage.removeItem('iSystemId')

      // 允许重新加载菜单信息
      this.$store.commit('SET_ISINIT', false)

      // vuex内容全部卸载掉
      // 卸载modules模块的内vuex 主页和登录的不卸载
      const modules = this.$store._modules.root._children
      const modulesKeys = Object.keys(modules)
      modulesKeys.forEach(v => {
        // 卸载当前所有vuex模块 - arr是不卸载的
        const arr = ['core', 'permission', 'app', 'login', 'modules']
        if (!arr.includes(v)) this.$store.unregisterModule(v)
      })

      // 卸载vue-router信息
      resetRouter()

      // 退出系统
      this.$ireve.NBSuccessLogoutService({ dev: '' })

      setTimeout(v => {
        window.location.href = window.location.origin + '' + window.location.pathname
      }, 200)
    },
    // 获取菜单 这里可以使用测试数据
    async GetMeuns() {
      const res = await getMenus()
      const menus = res.data

      // 设置侧边栏信息 树状结构
      this.$store.commit('SET_MENUS', menus)

      // APP.vue中保存下来的信息
      this.childRouter = this.$store.state.core.childRouter
      this.page = this.$store.state.core.page

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
          const p = await _import(modules.folder)

          // 需要生成路由的菜单
          // const menusRouter = [modules]

          // 路由 如果菜单只有四个路由 文件夹内部又存在另外的路由 则进行合并
          this.childRouter[0].children = p.router.concat(p.routerStatic)

          // 热更新导致重复加入
          this.page.push(...this.childRouter[0].children)
          this.$router.addRoutes(this.childRouter)

          // Store
          for (const name in p.store) {
            this.$store.registerModule(name, p.store[name])
          }

          // 储存路由表
          this.$store.commit('SET_PAGES', this.page)
        }

        const children = modules.children
        if (children) {
          for (let i = 0; i < children.length; i++) {
            this.deepTraversal(children[i])
          }
        }
      }
    },
    // 通过接口返回的消息拼接处需要的菜单信息 菜单格式参考core/api/menu.js
    createMenusByResponse(nodes) {
      // 为了数据不相互污染 做一下深拷贝
      nodes = JSON.parse(JSON.stringify(nodes))

      const deepTraversal = (nodes, nodeList = []) => {
        nodes.forEach(node => {
          if (node !== null) {
            // 生成新的节点 - 先默认向第一个插槽插入
            const newNode = {
              id: node.iProgramId,
              name: node.sProgramName,
              leaf: node.iColumnId !== 0,
              meta: { title: node.sProgramName, icon: node.sIcon },
              children: node.iColumnId === 0 ? [] : undefined,
              folder: node.iProgramCode,
              page: 'index',
              path: node.sUrl,
              baseSrcInfos: node.baseSrcInfos, // 资源
              icon: node.sIcon, // 图标
              title: node.sProgramName,
              scopedSlots: {
                title: 'title'
              },
              version: Math.random(),
              sRemarks: node.sRemarks
            }

            // 只有根节点需要push一次
            nodeList.push(newNode)

            if (node.childList && node.childList.length > 0) {
              // 对于子元素部分的遍历
              deepTraversal(node.childList, newNode.children)
            }
          }
        })

        return nodeList
      }

      return deepTraversal(nodes)
    }
  }
}
</script>

<style lang='scss' scoped>
  .nav-bar-wrapper {
    width: 100%;
    border-bottom: 1px solid rgba($back-color, 0.1);
    background: $title-color;

    .nav-bar {
      width: 100%;
      height: 81px;
      line-height: 81px;
      padding: 0 30px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      font-size: 32px;
      color: $text-color;

      > div {
        width: calc(100% / 3);
      }

      .logo, .back {
        @include flex(flex-start);
        align-items: center;
        cursor: pointer;

        .svg-icon, img {
          width: 46px;
          height: 46px;
        }

        span {
          color: $text-color;
          white-space: nowrap;
          font-size: 32px;
          font-weight: 500;
          margin-left: 11px;
          font-family: $bold-font-family;
        }
      }

      .title {
        color: $text-color;
        white-space: nowrap;
        font-size: 32px;
        font-weight: 500;
        margin-left: 11px;
        font-family: $bold-font-family;
      }

      .drawer {
        justify-content: flex-end;
        align-items: center;
        display: flex;

        > div {
          .svg-icon {
            width: 27px;
            height: 27px;
            color: gray;
          }
        }

        // 下拉
        .el-dropdown {
          margin-left: 28px;

          .user {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;

            span.portrait {
              display: inline-block;
              width: 48px;
              height: 48px;
              line-height: 48px;
              border-radius: 50%;
              text-align: center;
              background: $correct-text-color;
              color: $text-color;
              font-size: 36px;
              white-space: nowrap;
              font-family: $sub-font-family;
            }

            span.name {
              margin-left: 14px;
              font-size: 32px;
              color: $text-color;
              font-family: $bold-font-family;
            }

            .svg-icon {
              margin-left: 15px;
            }
          }
        }

        //科室信息
        .depart {
          .el-dropdown-link {
            span {
              color: $text-color;
              font-family: $font-family;
              font-size: 28px;
            }
          }
        }

        // 退出
        .logout {
          margin-left: 35px;
          display: flex;
          align-items: center;
          cursor: pointer;

          .svg-icon {
            width: 46px;
            height: 46px;
            color: $text-color;
          }

          span {
            margin-left: 3px;
            color: $text-color;
            font-size: 32px;
            font-family: $bold-font-family;
          }
        }
      }
    }
  }
</style>

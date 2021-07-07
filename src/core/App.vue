<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-01-08 11:17:18
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-07-05 14:59:35
 * @ Description: 统一处理所有文件 问题1 重复注入问题2 如果modules下无对应文件夹会导致错误需处理
 -->

<template>
  <div id="app" :class="locale !== 'cn' ? 'en-family' : 'cn-family'">
    <router-view />
    <key-board :show-key-board="showKeyBoard" />
    <!-- <div class="text-btn">
      <el-button @click="changeLocale('en-us')">English</el-button>
      <el-button @click="changeLocale('zh-cn')">中文</el-button>
      <el-button @click="changeLocale('zh-tw')">繁体</el-button>
    </div> -->
  </div>
</template>

<script>
import KeyBoard from '@dashboard/components/KeyBoard/KeyBoard'
// import CallBack from '@core/utils/callback.js'
// import WebSocketClass from '@core/utils/socket'

export default {
  name: 'App',
  components: {
    KeyBoard
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
    },
    isInit() {
      // 初始化
      return this.$store.state.core.isInit
    },
    // 显示键盘
    showKeyBoard() {
      return this.$store.state.core.showKeyBoard
    },
    // 底层数据
    UnderylingData() {
      return this.$store.state.core.UnderylingData
    }
  },
  watch: {
    locale(val) {
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
    },
    // 监听底层数据
    UnderylingData(val) {
      console.log('App.vue 只处理门锁常开任务')

      // 保存温湿度
      if (val.cmd === 'environmentReportService') {
        if (val.operate === 'report') {
          // 1
        }
      }
    }
  },
  created() {
    this.$Moment.locale(this.locale)

    this.init()
      .then(() => {})
      .catch(err => {
        console.log(err)
      })

    // 禁止放大缩小
    document.querySelector('body').addEventListener('touchmove', function(event) {
      event.touches.length >= 2 && event.preventDefault()
    })
  },
  mounted() {
    const isShowKeyBoard = true
    let currentInput
    window.addEventListener('mouseup', (e) => {
      // 如果有提示框的时候
      const domArr = document.querySelectorAll('.el-notification-network')
      domArr.forEach(v => v.setAttribute('style', 'bottom:0 !important'))
      if (isShowKeyBoard) {
        if (document.querySelector(':focus')) {
          // 判断当前获取焦点的元素是不是INPUT
          // console.log(111111, document.querySelector(':focus'), document.querySelector(':focus').getAttribute('keyboard'))
          if (document.querySelector(':focus').getAttribute('keyboard') === 'false') return
          // 针对时间选择器
          // console.log(111111, document.querySelector(':focus'), document.querySelector(':focus').getAttribute('name'))
          if (document.querySelector(':focus').getAttribute('name') === 'keyboard') return

          if (document.querySelector(':focus').tagName === 'INPUT') {
            currentInput = document.querySelector(':focus')
            this.$store.commit('SET_KEYBOARD', true)
            // 如果有提示框的时候
            const domArr = document.querySelectorAll('.el-notification-network')
            // console.log('-------', domArr)
            domArr.forEach(v => v.setAttribute('style', 'bottom:366px !important'))
          } else {
            // 如果不是则隐藏键盘
            this.$store.commit('SET_KEYBOARD', false)
            // 生成input事件
            // var event = new Event('input')
            // currentInput.dispatchEvent(event)
          }
        } else if (!(e.target.getAttribute('class') && e.target.getAttribute('class').includes('keyboard-item') ||
         e.target.parentNode.getAttribute('class') && e.target.parentNode.getAttribute('class').includes('keyboard-item'))) {
          // 如果当前点击的不是键盘里的按键那么隐藏键盘
          this.$store.commit('SET_KEYBOARD', false)
        }

        // 如果当前电机的是键盘里的按键
        if (e.target.getAttribute('class') && e.target.getAttribute('class').includes('keyboard-item') ||
        e.target.parentNode.getAttribute('class') && e.target.parentNode.getAttribute('class').includes('keyboard-item')) {
          const keyValue = e.target.innerText
          const keyClass = e.target.getAttribute('data-value')

          switch (keyClass) {
            case 'Delete':
              // 如果是delete 那么删除最后一个字符
              currentInput.value = currentInput.value.substring(0, currentInput.value.length - 1)
              break
            case 'Tab':
              this.$store.commit('SET_GLOBALFOCUS')
              break
            case 'Enter':
              this.$store.commit('SET_GLOBALENTER', {})

              // 把自己关掉
              // this.$store.commit('SET_KEYBOARD', false)
              break
            case 'Space':
              currentInput.value += ' '
              break
            case 'Shift':
              break
            case 'Caps':
              break
            default:
              currentInput.value += keyValue
              break
          }

          const definedEvent = new Event('input')
          currentInput.dispatchEvent(definedEvent)
        }
      }
    })
  },
  methods: {
    // 初始化基本路由信息
    async init() {
      if (this.isInit) return

      // 设置标题显示
      document.title = globalVar.appName

      const frame = require('@/frames/' + process.env.VUE_APP_FRAME + '/index').default

      // 注册Store各个模块
      for (const name in frame.store) {
        this.$store.registerModule(name, frame.store[name])
      }

      // 添加路由
      this.$router.addRoutes(frame.routerStatic)

      // 嵌套路由 / 默认两级路由
      const childRouter = frame.routerStatic.filter(item => item.path === '/main')
      const pages = childRouter[0].children

      // 存下来 frames 里面需要使用这个信息
      this.$store.commit('SET_CHILDROUTER', childRouter)
      this.$store.commit('SET_PAGE', pages)

      // 设置页面信息 再后来合并
      this.$store.commit('SET_PAGES', pages)
    },
    // 切换语言
    changeLocale(localeval) {
      this.$store.commit('SET_LOCALE', localeval)
    }
  }
}
</script>

<style lang="scss">
@import "@core/styles/reset.scss";

#app {
	font-family: $font-family, $bold-font-family, $sub-font-family, $reg-font-family;
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

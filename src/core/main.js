/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:35:49
 * @ Description: 入口js
 * @ Description: 把所有的打包进去了，后续按照需求进行各个系统的拆分
 */

import Vue from 'vue'
import App from '@core/App.vue'
import router from '@core/router/router'
import store from '@core/store/index'
// import 'babel-polyfill'
import i18n from './i18n/i18n'

// UI框架
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

// vant时间插件
import { DatetimePicker } from 'vant'
import 'vant/lib/datetime-picker/style'
Vue.use(DatetimePicker)

// icon
import '@core/icons'

// 绑定与中台通信方法
import Ireve from '@core/utils/instruction/ireve'
Vue.prototype.$ireve = Ireve

// 加载基础方法
import { util } from '@core/utils/utils'
Vue.prototype.$Util = util

// 自定义指令
import Direction from '@core/utils/directive'
Vue.use(Direction)

import moment from 'moment'
Vue.prototype.$Moment = moment

// 加载错误监听
import { errorHandler, unhandledrejection, globalClick } from '@core/utils/err-capture'
Vue.config.errorHandler = errorHandler
window.addEventListener('unhandledrejection', unhandledrejection)
window.addEventListener('click', globalClick, true)

Vue.config.productionTip = false
Vue.config.devtools = true

// 为了解决 axios 中 commit无效的问题 可以在这里导出vue实例，在axios中commit
// 或者每个需要的接口自己commit，不再全局commit

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

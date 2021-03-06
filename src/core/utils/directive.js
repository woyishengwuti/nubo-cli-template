/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-06-01 13:36:05
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:23:21
 * @ Description: 全局自定义指令
 */

// import Nuobo from '@core/utils/instruction'

// 注册全局指令
const Direction = function(Vue) {
  Vue.directive('autofocus', {
    // 当绑定元素插入到 DOM 中。
    inserted(el, { value }) {
      // 聚焦元素
      if (value) {
        el.querySelector('.el-input__inner').focus()
      }
    },
    update(el, { value }) {
      if (value) {
        el.querySelector('.el-input__inner').focus()
      }
    }
  })
}

export default Direction

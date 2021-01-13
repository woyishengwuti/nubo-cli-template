/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-08-07 11:48:10
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-08-07 15:04:45
 * @ Description: mixin 用来确认输入框的按钮是否可以点击
 */

// 能否点击减号
function isClickToDesc(iNum, iQuant) {
  return Number(iQuant) <= 0 ? Number(iNum) <= Number(iQuant) : Number(iNum) <= 0
}

// 能否点击加号
function isClickToInc(iNum, iQuant) {
  return Number(iQuant) <= 0 ? Number(iNum) >= 0 : Number(iNum) >= Number(iQuant)
}

// 输入框的按钮是否可以点击
export const OperNumMixin = {
  data() {
    return {}
  },
  methods: {
    // 能否点击加号
    isClickToInc(iNum, iQuant) {
      return isClickToInc(iNum, iQuant)
    },
    // 能否点击减号
    isClickToDesc(iNum, iQuant) {
      return isClickToDesc(iNum, iQuant)
    }
  }
}

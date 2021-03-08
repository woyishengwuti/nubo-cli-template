/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-04-21 14:31:26
 * @ Description: 侧边栏控制信息
 */

const state = {
  spin: {
    spinning: false, // 全局提示
    delayTime: 50, // 延迟打开的时间
    tip: 'loading...'
  },
  loading: false, // 全局按钮loading
  appKeyboard: true // 是否显示键盘
}

const mutations = {
  SET_SPIN: (state, info) => {
    // 设置全局loading
    state.spin = {
      ...info
    }
  },
  SET_LOADING: (state, info) => {
    // 设置全局按钮loading
    state.loading = info
  },
  SET_KEYBOARD: (state, info) => {
    // 是否显示键盘
    state.appKeyboard = info
    localStorage.setItem('appKeyboard', info)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

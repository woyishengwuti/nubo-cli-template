/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-06-11 15:04:55
 * @ Description: 登录页面信息
 */

export default {
  namespaced: true,
  state: {
    token: '',
    user: '',
    userInfo: '', // 登录人信息
    isShowTips: false // 是否显示提示信息
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
    getUserInfo: state => state.userInfo
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    SET_USER: (state, user) => {
      state.user = user
      sessionStorage.setItem('user', user)
    },
    SET_USERINFO: (state, info) => {
      state.userInfo = info
    },
    // 设置提示信息
    SET_SHOWTIPS: (state, info) => {
      state.isShowTips = info
    }
  }
}

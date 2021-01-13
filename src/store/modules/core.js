/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:38:59
 * @ Description: 核心路由
 */

const core = {
  state: {
    menus: [],
    childRouter: [], // app中保存下来的数据
    page: [], // app中保存下来的数据
    isInit: false, // 是否初始化
    locale: 'zh-cn',
    showKeyBoard: false, // 是否显示键盘
    loading: false // 全局按钮loading
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_LOCALE: (state, info) => {
      // 设置语言
      state.locale = info
      localStorage.setItem('locale', info)
    },
    SET_ISINIT: (state, info) => {
      // 是否已经初始化
      state.isInit = info
    },
    // 设置chileRouter
    SET_CHILDROUTER: (state, info) => {
      state.childRouter = info
    },
    // 设置page
    SET_PAGE: (state, info) => {
      state.page = info
    },
    SET_LOADING: (state, info) => {
      // 设置全局按钮loading
      state.loading = info
    },
    // 设置键盘
    SET_KEYBOARD: (state, info) => {
      state.showKeyBoard = info
    }
  },
  getters: {
    menus: state => state.menus
  }
}

export default core

/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-05-08 14:46:12
 * @ Description: 侧边栏数据信息
 */

export default {
  state: {
    pages: []
  },
  getters: {
    pages: state => state.pages
  },
  mutations: {
    SET_PAGES: (state, pages) => {
      state.pages = pages
    }
  }
}

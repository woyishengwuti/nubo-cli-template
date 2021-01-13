/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-26 08:55:26
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:37:05
 * @ Description: test 页面信息
 */

const state = {
  test: '' // 模板信息
}

const mutations = {
  // tree节点
  SET_DATAREF: (state, info) => {
    state.test = info
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('SET_DATAREF')
  }
}

export default {
  test: {
    namespaced: true,
    state,
    mutations,
    actions
  }
}


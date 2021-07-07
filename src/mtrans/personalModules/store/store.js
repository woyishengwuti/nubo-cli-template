/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-26 08:55:26
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:40:59
 * @ Description: personalModules 页面信息
 */

const state = {
  personalModules: '' // 模板信息
}

const mutations = {
  // tree节点
  SET_DATAREF: (state, info) => {
    state.personalModules = info
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('SET_DATAREF')
  }
}

export default {
  personalModules: {
    namespaced: true,
    state,
    mutations,
    actions
  }
}


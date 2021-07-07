/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-26 10:00:46
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:27:31
 * @ Description: 模块内通用的数据 在主页面保存下来
 */

// import api from '../../api/api'

export default {
  namespaced: true,
  state: {
    title: '' // 标题
  },
  getters: {
    // 获取标题信息
    getTitle: state => state.title || localStorage.getItem('ModulesTitle')
  },
  actions: {

  }
}

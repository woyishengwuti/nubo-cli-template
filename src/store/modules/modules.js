/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-26 10:00:46
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:39:58
 * @ Description: 模块内通用的数据 在主页面保存下来
 */

import api from '../../api/api'

export default {
  namespaced: true,
  state: {
    title: '' // 标题
  },
  getters: {
    // 获取标题信息
    getTitle: state => state.title || localStorage.getItem('ModulesTitle')
  },
  mutations: {
    // 保存标题信息
    SET_TITLE: (state, info) => {
      state.title = info
      localStorage.setItem('ModulesTitle', info)
    }
  },
  actions: {
    // 更新批号信息
    async loadBatchOptions(context) {
      const res = await api.getAllDrugBtach()

      if (res.result) {
        const data = res.data

        if (data) {
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
              let element = data[key]

              // 去重
              const obj = {}
              element = element.reduce((cur, next) => {
                obj[next.sBatch] ? '' : (obj[next.sBatch] = true && cur.push(next))
                return cur
              }, [])

              data[key] = element
            }
          }
        }

        context.commit('SET_BATCHOPTIONS', data)
      }
    }
  }
}

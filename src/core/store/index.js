/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:21:37
 * @ Description: 总Vuex
 */

import Vue from 'vue'
import Vuex from 'vuex'

// 模块
import core from '@core/store/modules/core'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    core
  }
})

export default store

/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-12-17 09:57:40
 * @ Description: 总Vuex
 */

import Vue from 'vue'
import Vuex from 'vuex'

// 模块
import core from './modules/core'
import permission from './modules/permission'
import app from './modules/app'
import login from './modules/login'
import modules from './modules/modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    core,
    permission,
    app,
    login,
    modules
  }
})

export default store

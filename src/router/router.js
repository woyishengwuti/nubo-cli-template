/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-12-17 09:34:59
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-08 17:45:27
 * @ Description:
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const createRouter = () => new VueRouter({
  mode: 'hash',
  base: '__dirname',
  routes: []
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router

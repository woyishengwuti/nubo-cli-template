/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-02-23 16:31:25
 * @ Description: 总路由
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

// 避免重复点击导航
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router

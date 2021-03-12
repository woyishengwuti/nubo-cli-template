/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:47:50
 * @ Description: 导出 personalModules 信息
 */

import RouterStatic from '@/modules/personalModules/router/router'
import store from '@/modules/personalModules/store/store'

export default {
  router: [{
    name: 'personalModules',
    path: '/main/personal-modules',
    component: resolve => import(/* webpackChunkName:"personalModules" */`@/modules/personalModules/views/index`),
    meta: {
      puzzleName: 'personalModules',
      name: '模块',
      resource: []
    }
  }],
  routerStatic: RouterStatic,
  store
}

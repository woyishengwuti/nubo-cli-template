/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:47:20
 * @ Description: 导出 personalModules1 信息
 */

import RouterStatic from '@/modules2/personalModules1/router/router'
import store from '@/modules2/personalModules1/store/store'

export default {
  router: [{
    name: 'personalModules1',
    path: '/main/personal-modules1',
    component: resolve => import(/* webpackChunkName:"personalModules1" */`@/modules2/personalModules1/views/index`),
    meta: {
      puzzleName: 'personalModules1',
      name: '模块',
      resource: []
    }
  }],
  routerStatic: RouterStatic,
  store
}

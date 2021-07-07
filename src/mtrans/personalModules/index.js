/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-07-05 15:08:49
 * @ Description: 导出 personalModules 信息
 */

import RouterStatic from '@/mtrans/personalModules/router/router'
import store from '@/mtrans/personalModules/store/store'

export default {
  router: [{
    name: 'personalModules',
    path: '/main/personal-modules1',
    component: resolve => import(/* webpackChunkName:"personalModules" */`@/mtrans/personalModules/views/index`),
    meta: {
      puzzleName: 'personalModules',
      name: '模块',
      resource: []
    }
  }],
  routerStatic: RouterStatic,
  store
}

/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:40:00
 * @ Description: 导出 personalModules1 信息
 */

import RouterStatic from '@/modules/personalModules1/router/router'
import store from '@/modules/personalModules1/store/store'

export default {
  router: [{
    name: 'personalModules1',
    path: '/main/personal-modules1',
    component: resolve => require([`@/modules/personalModules1/views/index`], resolve),
    meta: {
      puzzleName: 'personalModules1',
      name: '模块',
      resource: []
    }
  }],
  routerStatic: RouterStatic,
  store
}

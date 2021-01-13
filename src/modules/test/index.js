/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 11:09:52
 * @ Description: test
 */

import RouterStatic from '@modules/test/router/router'
import store from '@modules/test/store/store'

export default {
  router: [{
    name: 'test',
    path: '/main/test',
    component: resolve => require([`@modules/test/views/index`], resolve),
    meta: {
      puzzleName: 'test',
      name: 'test',
      resource: []
    }
  }],
  routerStatic: RouterStatic,
  store
}

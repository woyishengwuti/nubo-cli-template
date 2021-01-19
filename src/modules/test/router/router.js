/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-16 16:51:52
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-19 16:57:30
 * @ Description: giveBack 二级路由
 */

export default [
  {
    name: 'testSub',
    path: '/main/test-sub',
    meta: {
      name: 'testSub'
    },
    component: resolve => require(['@modules/test/views/subIndex'], resolve)
  }
]

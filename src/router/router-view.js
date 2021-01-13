/**
 * @ Author: feixiang.wu
 * @ Create Time: 2021-01-08 17:43:33
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-08 17:45:29
 * @ Description:
 */

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: resolve => require(['@/views/login/Login'], resolve)
  },
  {
    path: '/main',
    component: resolve => require(['@/views/Layout/index'], resolve),
    children: [
      {
        path: '/',
        redirect: '/menu'
      },
      {
        path: '/menu',
        component: resolve => require(['@/views/Menu/Menu'], resolve)
      }
    ]
  },
  {
    path: '*',
    component: resolve => require(['@/views/Layout/index'], resolve)
  }
]

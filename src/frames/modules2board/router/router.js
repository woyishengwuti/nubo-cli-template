/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-09-19 11:30:41
 * @ Description: 登录页主页欢迎页404路由
 */

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: resolve => require(['@modules2board/views/login/Login'], resolve)
  },
  {
    path: '/main',
    component: resolve => require(['@modules2board/views/Layout/index'], resolve),
    children: [
      {
        path: '/',
        redirect: '/menu'
      },
      {
        path: '/menu',
        component: resolve => require(['@modules2board/views/Menu/Menu'], resolve)
      }
    ]
  },
  {
    path: '*',
    component: resolve => require(['@modules2board/views/Layout/index'], resolve)
  }
]

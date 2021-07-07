/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:14
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-07-05 14:56:23
 * @ Description: 登录页主页欢迎页404路由
 */

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: resolve => import(/* webpackChunkName:"login" */'@dashboard/views/login/Login')
  },
  {
    path: '/main',
    component: resolve => import(/* webpackChunkName:"Layout" */'@dashboard/views/Layout/index'),
    children: [
      {
        path: '/',
        redirect: '/menu'
      },
      {
        path: '/menu',
        component: resolve => import(/* webpackChunkName:"Menu" */'@dashboard/views/Menu/Menu')
      }
    ]
  },
  {
    path: '*',
    component: resolve => import(/* webpackChunkName:"Layout" */'@dashboard/views/Layout/index')
  }
]

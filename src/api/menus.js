/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-01-08 11:17:18
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:59:43
 * @ Description: 菜单兼路由 父级的ID对应modules下每一个文件夹的名字
 */

export default [
  {
    id: '1',
    name: '测试页面',
    leaf: true,
    folder: 'test',
    page: 'index',
    path: '/main/test',
    meta: { title: '测试页面', icon: 'test' }
  }
]

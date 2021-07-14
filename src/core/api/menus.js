/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-01-08 11:17:18
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-07-14 18:02:54
 * @ Description: 菜单兼路由 父级的ID对应modules下每一个文件夹的名字
 * 这个文件表示 在modules下文件夹下 每个文件夹是一个模块 可以通过其中的router把modules下其他文件夹内容挂载到某一个父级菜单下面
 */

export default [
  {
    id: '1',
    name: '测试模块',
    leaf: true,
    folder: 'personalModules',
    page: 'index',
    path: '/main/personal-modules',
    meta: { title: '测试模块', icon: 'modules' }
  }
]

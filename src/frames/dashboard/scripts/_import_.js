/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:38:14
 * @ Description: 开发环境
 */

export default (name) => import(`@/modules/${name}/index.js`)

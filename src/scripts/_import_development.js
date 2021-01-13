/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-10-16 18:03:14
 * @ Description: 开发环境
 */

export default (type, name) => import(`@/${type}/${name}/index.js`)

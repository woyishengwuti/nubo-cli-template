/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-01-08 11:17:19
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-07-31 08:42:49
 * @ Description: api基础路径
 */

let api = ''

if (process.env.NODE_ENV === 'production') {
  // 生产环境
  api = globalVar.baseUrl
} else {
  // 开发环境
  api = '/api'
}

export { api }

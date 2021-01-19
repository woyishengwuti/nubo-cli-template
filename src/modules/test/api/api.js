/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-17 13:41:58
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-19 16:56:55
 * @ Description: 测试接口
 */

import service from '@core/utils/request'
import { api } from '@core/utils/base'

export default {
  // 获取菜单列表
  test(params) {
    return service({
      url: api + '/test/list',
      method: 'GET',
      params
    })
  }
}

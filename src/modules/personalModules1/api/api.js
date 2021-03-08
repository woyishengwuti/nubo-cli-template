/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-17 13:41:58
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 13:49:18
 * @ Description: personalModules1 接口
 */

import service from '@core/utils/request'
import { api } from '@core/utils/base'
// import qs from 'qs'

export default {
  // 获取菜单列表
  getMenuInfo(params) {
    return service({
      url: api + '/base-program-info/list',
      method: 'GET',
      params
    })
  }
}

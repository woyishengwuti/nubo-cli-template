/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-07-16 13:45:22
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-07-16 13:46:05
 * @ Description: 记录错误日志的接口
 */

import service from '@core/utils/request'
import { api } from '@core/utils/base'
// import qs from 'qs'

export default {
  // 登录
  login(data) {
    return service({
      url: api + '/base-user-info/login',
      method: 'POST',
      data
    })
  }
}

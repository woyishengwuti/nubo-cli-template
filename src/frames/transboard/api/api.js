/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-17 13:41:58
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:25:42
 * @ Description: 登录和主页的接口, 参数是对象使用data，是字符串使用params
 */

import service from '@core/utils/request'
import { api } from '@core/utils/base'
// import qs from 'qs'

export default {
  login(data) {
    // 登录
    return service({
      url: api + '/base-user-info/login',
      method: 'POST',
      data
    })
  }
}

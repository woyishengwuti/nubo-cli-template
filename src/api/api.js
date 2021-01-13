/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-07-16 13:45:22
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:34:18
 * @ Description: 记录错误日志的接口
 */

import service from '@/utils/request'
import { api } from '@/utils/base'
// import qs from 'qs'

export default {
  // 登录
  login(data) {
    return service({
      url: api + '/test/login',
      method: 'POST',
      data
    })
  }
}
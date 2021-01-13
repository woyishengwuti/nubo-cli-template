/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-02-24 08:28:57
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:45:11
 * @ Description: 接受浏览器消息的回调
 */

// import store from '@/store/'
// import { NBAnalysis } from '@/utils/utils'
// import { Message } from 'element-ui'
// import House from '@/utils/instruction/house'

const CallBack = (res) => {
  console.info('%c' + '中间件回复' + res, 'color: #5474E5; font-size: 18px; font-family: Montserrat Regular')
}

export default CallBack

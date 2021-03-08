/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-02-24 08:28:57
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:23:01
 * @ Description: 接受浏览器消息的回调
 */

// import store from '@core/store/'

const CallBack = (res) => {
  console.info('%c' + '中台回复' + res, 'color: #5474E5; font-size: 18px; font-family: Montserrat Regular')
  // type: result 表示返回结果
  if (res.includes('result') || res.includes('data')) {
    // 去掉head教研区域
    res = res.replace(/\{[^\)]*\}\{/, '{')

    const derData = JSON.parse(res)
    Object.freeze(derData)

    // 获取返回结果
    if (derData.result) {
      const Target = derData.result
      if (!Array.isArray(Target)) throw new Error('Target is not a proper Array')

      // 这里是操作的返回结果
    } else if (derData.data) {
      const Target = derData.data[0].target
      if (!Array.isArray(Target)) throw new Error('Target is not a proper Array')

      // const cmd = derData.data[0].cmd
      // const operate = derData.data[0].operate

      // 这里是主动的上报包括数量上报上锁等消息
    } else {
      console.error('中台上报数据错误')
    }
  }
}

export default CallBack

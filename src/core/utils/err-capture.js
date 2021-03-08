/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-07-16 13:40:19
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-08-20 11:19:39
 * @ Description: Vue错误处理
 */

import api from '../api/api'
export const errorHandler = function(err) {
  console.log('错误', err.stack, api)
}

export const unhandledrejection = function(e) {
  e.preventDefault()
  console.log('promise错误', e.reason.stack)
}

export const globalClick = function(e) {
  // console.log('全局click', e)
}

// 拿到Performance并且初始化一些参数
// const timing = performance.timing
// const start = timing.navigationStart
// let dnsTime = 0
// let tcpTime = 0
// let firstPaintTime = 0
// let domRenderTime = 0
// let loadTime = 0
// // 根据提供的api和属性，拿到对应的时间
// dnsTime = timing.domainLookupEnd - timing.domainLookupStart
// tcpTime = timing.connectEnd - timing.connectStart
// firstPaintTime = timing.responseStart - start
// domRenderTime = timing.domContentLoadedEventEnd - start
// loadTime = timing.loadEventEnd - start

// console.log('DNS解析时间:', dnsTime,
//   '\nTCP建立时间:', tcpTime,
//   '\n首屏时间:', firstPaintTime,
//   '\ndom渲染完成时间:', domRenderTime,
//   '\n页面onload时间:', loadTime)


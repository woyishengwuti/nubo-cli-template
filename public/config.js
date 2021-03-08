/**
 * @ Author: feixiang.wu
 * @ Create Time: 2019-12-31 09:34:02
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-02-23 16:30:27
 * @ Description: 系统配置
 */

var { ipcRenderer } = typeof require !== 'undefined' ? require('electron') : {ipcRenderer : {on: () => {}, send: () => {}}}

window.globalVar = {
  version: Math.random(),
  sZDID: 'ZDID_00504', // 主终端ID 先用一下
  sTerAddress: 'TERMINAL-DEVICE-00000000',//  终端的嵌入式地址
  sIreveAddress: 'R2000-A1SC-00000010',//  图像识别终端地址
  appName: '深圳诺博智能图像识别车 V1.0.0', // 系统名称
  baseUrl: 'http://127.0.0.1:8093/dsm-txsb', //请求api地址 正式环境使用
  frame: 'modulesboard', // 使用基座名称
  pageHome: '', // 指定一个首页，值为路由 name
  pageSize: 10, // 表格每页显示数量
  ws: {
    //网址（端口是我下面的服务器的端口）
    url: "ws://localhost:9999",
    //心跳时间（单位:ms）
    heartBeat: 5000,
    //发送心跳信息
    heartMsg: 'hello',
    //开起重连
    reconnect: true,
    //重连间隔时间（单位:ms）
    reconnectTime: 5000,
    //重连次数
    reconnectAttempts: 10
  },
  ipcRenderer,
  sender: null,  //初始化webocket后创建的对象信息
  throttleTime: 1000, //防抖
  hospital: '北京大学深圳医院',
  nSimilarity: 80, // 相似度
  isDemo: true, // 是否是演示环境
}

/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-02-19 09:12:21
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-12-31 16:42:45
 * @ Description: websocket
 */

import { Notification } from 'element-ui'
let notification = null

class WebSocketClass {
  constructor(params) {
    // websocket实例
    this.socket = null

    // 连接状态
    this.alive = false

    // 重连计时器
    this.reconnectTimer = null

    // 心跳计时器
    this.heartTimer = null

    // 信息onmessage缓存方法
    this.messageFunc = null

    // 把类的参数传入这里，方便调用
    this.params = params

    this.init()
  }

  // 初始化
  init() {
    if (this.reconnectTimer) clearInterval(this.reconnectTimer)
    if (this.heartTimer) clearInterval(this.heartTimer)

    // 取出所有参数
    const params = this.params

    const { url } = params
    this.socket = new WebSocket(url)

    if (this.messageFunc) {
      this.onmessage(this.messageFunc)
    }

    // 默认绑定事件
    this.socket.onopen = () => {
      console.log('success')
      // 设置状态为开启
      this.alive = true
      if (this.reconnectTimer) clearInterval(this.reconnectTimer)

      // 连接后进入心跳状态
      // this.onheartbeat()

      // 连接成功去掉提示
      Notification.closeAll()
      notification = null
    }

    this.socket.onclose = () => {
      console.log('close')
      // 设置状态为断开
      this.alive = false

      clearInterval(this.heartTimer)

      // 自动重连开启 不在重连状态下
      if (this.params.reconnect) {
        // 断开后立刻重连
        this.onreconnect()
      }

      // 打开显示层
      if (!notification || (notification && !notification.visible)) {
        notification = Notification({
          title: '',
          iconClass: 'el-icon-warning',
          message: '通讯连接断开',
          position: 'bottom-right',
          customClass: 'el-notification-default el-notification-network',
          duration: 0
        })
      }
    }

    // this.socket.onerror = () => {
    //   console.error('error')
    // }
  }

  // websocket连接成功事件
  onopen(func) {
    // console.error('外界自定义open事件')
    this.socket.onopen = event => {
      this.alive = true

      func && func(event)
    }
  }

  // 发送消息
  send(text) {
    if (this.alive) {
      text = typeof text === 'string' ? text : JSON.stringify(text)
      this.socket.send(text)
    }
  }

  // 主动断开连接
  close() {
    if (this.alive) {
      this.socket.close()
    }
  }

  // 接受消息
  onmessage(func, all = false) {
    this.messageFunc = func

    this.socket.onmessage = data => {
      // console.error('data', data)
      func(!all ? data.data : data)
    }
  }

  // websocket关闭事件
  onclose(func) {
    this.socket.onclose = event => {
      // 设置状态为断开
      this.alive = false

      clearInterval(this.heartTimer)

      // 自动重连开启
      if (this.params.reconnect) {
        // 断开后立刻重连
        this.onreconnect()
      }

      func && func(event)
    }
  }

  // websocket错误事件
  onerror(func) {
    this.socket.onerror = event => {
      func && func(event)
    }
  }

  // 心跳事件
  onheartbeat(func) {
    // 在连接状态下
    if (this.alive) {
      // 心跳计时器
      this.heartTimer = setInterval(() => {
        // 发送心跳信息
        this.send(this.params.heartMsg)

        func && func.call(this)
      }, this.params.heartBeat)
    }
  }

  // 重连事件
  onreconnect(func) {
    // 重连间隔计时器
    let reconnectAttempts = this.params.reconnectAttempts
    if (!reconnectAttempts) return

    this.reconnectTimer = setInterval(() => {
      // 限制重连次数
      if (reconnectAttempts <= 0) {
        // 关闭定时器
        clearInterval(this.reconnectTimer)
        return false
      }

      // 重连一次-1
      reconnectAttempts--

      // 进入初始状态
      this.init()
      func ? func(this) : false
    }, this.params.reconnectTime)
  }
}

export default WebSocketClass

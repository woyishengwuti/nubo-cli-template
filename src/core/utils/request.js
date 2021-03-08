/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: ccwang
 * @ Modified time: 2020-10-12 11:57:02
 * @ Description: 请求及拦截
 */

import axios from 'axios'
import router from '@core/router/router'
// import store from '@core/store/index'
import { Message, Notification } from 'element-ui'
let notification = null

// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  },
  timeout: 20 * 1000 // request timeout
})

// 下载Excel模板  Content-Type：content-type:octet-stream
// 导出Excel文件  Content-Type：application/vnd.ms-excel
// 编码都是UTF-8

// request interceptor
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      // 添加 token
      config.headers['Authorization'] = token
    }

    if (config.url.includes('downloadTemplate') || config.url.includes('export')) {
      // 导入模板
      config['responseType'] = 'blob'
    }

    return config
  },
  error => {
    // for debug
    console.log(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // console.log('response', response)
    if (Number(response.data.code) === 200) {
      if (response.data.result) {
        // 成功
      } else {
        // 提示错误
        Message.error(response.data.message || '请求失败，请重试')
      }
    } else if (Number(response.data.code) === 401) {
      Message.error('登录凭证已过期，请重新登录')

      setTimeout(v => {
        router.replace('/')
      }, 1000)
    } else if (Number(response.status) === 200) {
      if (response.data.type === 'application/vnd.ms-excel' || response.data.type === 'content-type:octet-stream') {
        return response
      } else {
        Message.error(response.data.message || '请求失败，请重试')
      }
    } else {
      Message.error(response.message || '请求失败，请重试')
    }

    // 全局按钮loading
    // store.commit('SET_LOADING', false)
    Notification.closeAll()

    return response.data
  },
  error => {
    if (Number(error.response.status) === 500) {
      if (notification) return
      notification = Notification({
        title: '',
        iconClass: 'el-icon-warning',
        message: '网络异常，请检查网络~',
        position: 'bottom-right',
        customClass: 'el-notification-default el-notification-network notice-network',
        showClose: false,
        offset: 0,
        duration: 0
      })
    } else {
      // 全局错误提示
      Message.error(error.message)
    }

    // store.commit('SET_LOADING', false)

    return Promise.reject(error)
  }
)

export default service

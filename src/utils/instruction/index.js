/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-10-09 13:32:29
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:44:18
 * @ Description: 通用指令
 */

// import store from '@/store'

class Nuobo {
  constructor() {
    this.timeInterval = 0
  }

  uid(max = 9999, min = 1000) {
    // 生成一个随机数
    return ((Math.random() * (max - min)) + min).toFixed(0)
  }
}

export default Nuobo

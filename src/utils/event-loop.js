/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-08-21 15:05:11
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-08-21 15:09:05
 * @ Description:
 */

class EventLoopClass {
  constructor(name) {
    this.name = name
    this.queue = []
    console.log(`Hi I am ${name}`)
    setTimeout(() => {
      this.next()
    }, 0)
  }

  // 需要暂停的事件
  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time)
    }

    this.queue.push(fn)
    return this
  }

  // 需要做的事情
  process(food) {
    const fn = () => {
      console.log(`I am eating ${food}`)
      this.next()
    }

    this.queue.push(fn)
    return this
  }

  next() {
    const fn = this.queue.shift()
    fn && fn()
  }
}

export default new EventLoopClass()


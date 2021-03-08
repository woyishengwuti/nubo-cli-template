/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-04-02 10:40:08
 * @ Description: localstorage
 */

const storage = (function mystorage() {
  const ms = 'mystorage'
  const storage = window.localStorage

  const test = function() {
    return !!window.localStorage
  }

  const setItem = function(key, value) {
    // 存储
    let mydata = storage.getItem(ms)
    if (!mydata) {
      this.init()
      mydata = storage.getItem(ms)
    }

    mydata = JSON.parse(mydata)
    mydata.data[key] = value
    storage.setItem(ms, JSON.stringify(mydata))
    return mydata.data
  }

  const getItem = function(key) {
    // 读取
    let mydata = storage.getItem(ms)
    if (!mydata) {
      return false
    }

    mydata = JSON.parse(mydata)
    return mydata.data[key]
  }

  const removeItem = function(key) {
    // 读取
    let mydata = storage.getItem(ms)
    if (!mydata) {
      return false
    }

    mydata = JSON.parse(mydata)
    delete mydata.data[key]
    storage.setItem(ms, JSON.stringify(mydata))
    return mydata.data
  }

  const clear = function() {
    // 清除对象
    storage.removeItem(ms)
  }

  const init = function() {
    storage.setItem(ms, '{"data":{}}')
  }

  return {
    test: test,
    setItem: setItem,
    getItem: getItem,
    removeItem: removeItem,
    init: init,
    clear: clear
  }
})()

export default storage

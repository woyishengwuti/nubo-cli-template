/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-09-06 20:23:31
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-09-06 20:55:34
 * @ Description: 提交数据前的信息验证
 */

// 策略对象
const strategys = {
  // 是否是一个正数（不带小数）
  isPlusNumberWithoutDot() {
    const reg = this.numReg
    return function(data, attr) {
      return data.map(v => {
        // 非数字 - 打上标志
        this.$set(v, 'err', !reg.test(v[attr]))

        return !reg.test(v[attr]) ? v : null
      }).filter(v => v)
    }
  },
  // 是否是一个正数（带小数）
  isPlusNumber() {
    const reg = this.plusReg
    return function(data, attr) {
      return data.map(v => {
        // 非数字 - 打上标志
        this.$set(v, 'err', !reg.test(v[attr]))

        return !reg.test(v[attr]) ? v : null
      }).filter(v => v)
    }
  },
  // 是否是一个正确的数字
  isNumber() {
    return function(data, attr) {
      return data.map(v => {
        // 非数字 - 打上标志
        this.$set(v, 'err', isNaN(Number(v[attr])))

        return isNaN(Number(v[attr])) ? v : null
      }).filter(v => v)
    }
  },
  // 是否是一个负数
  isHasNegative() {
    return function(data, attr) {
      return data.map(v => {
        // 存在负数 - 打上标志
        this.$set(v, 'err', Number(v[attr]) < 0)

        return Number(v[attr]) < 0 ? v : null
      }).filter(v => v)
    }
  },
  // 是否满足传入的条件
  // 不考虑不同位置同一种药品的时候使用这个
  isMeetCount() {
    return function(data, iM) {
      const isMoreThenStock = data.map(v => {
        const func = new Function('v', iM)(v)

        // 超过账面库存 - 打上标志
        this.$set(v, 'err', func)

        return func ? v : null
      }).filter(v => v)

      return isMoreThenStock
    }
  },
  // 是否满足传入的条件
  // 是否在待取药列表是否满足数量条件 - 考虑不同位置同一种药品的时候使用这个
  isMeetByMerge() {
    const _this = this
    return function(data, iM) {
      // 是否超过待取待补数量的需要合并数据才可以
      let dataClone = JSON.parse(JSON.stringify(data))

      // 复制一份数据合并一下
      dataClone = _this.mergeDialogList(dataClone)

      const notEqualDrugTds = []
      const MoreThenStockData = dataClone.map(v => {
        const func = new Function('v', iM)(v)

        // 返回true表示不相等，此时加进去
        if (func) notEqualDrugTds.push(v.iDrugId)

        return func ? v : null
      }).filter(v => v)

      // 页面显示的需要打上标志
      data.forEach(v => {
        // 超过待取 - 打上标志
        this.$set(v, 'err', notEqualDrugTds.includes(v.iDrugId))
      })

      return MoreThenStockData
    }
  }
}

class Validator {
  constructor(cache) {
    this.cache = cache
  }

  add(dom, rules) {
    var self = this
    // eslint-disable-next-line no-cond-assign
    for (var i = 0, rule; rule = rules[i++];) {
      (function(rule) {
        var strategyAry = rule.strategy.split(':')
        var errorMsg = rule.errorMsg
        self.cache.push(function() {
          var strategy = strategyAry.shift()
          strategyAry.unshift(dom.value)
          strategyAry.push(errorMsg)
          return strategys[strategy].apply(dom, strategyAry)
        })
      })(rule)
    }
  }

  start() {
    // eslint-disable-next-line no-cond-assign
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      // 开始效验 并取得效验后的返回信息
      var msg = validatorFunc()

      if (msg) {
        return msg
      }
    }
  }
}

// 代码调用
// data -> 先验证是否是数字 -> data再合并验证是否是超出库存或者待取数量
var registerForm = document.getElementById('registerForm')
var validateFunc = function() {
  // 创建一个Validator对象
  var validator = new Validator()

  // 添加一些效验规则
  validator.add(this.tabelDataApp, [
    { strategy: 'isPlusNumber', errorMsg: '一个正确的数字' },
    { strategy: 'isPlusNumber', errorMsg: '一个正确的数字' }
  ])

  validator.add(this.tabelDataApp, [
    { strategy: 'isPlusNumber', errorMsg: '一个正确的数字' }
  ])

  validator.add(this.tabelDataApp, [
    { strategy: 'isPlusNumber', errorMsg: '一个正确的数字' }
  ])

  // 获得效验结果
  var errorMsg = validator.start()

  // 返回效验结果
  return errorMsg
}

// 点击确定提交
registerForm.onsubmit = function() {
  var errorMsg = validateFunc()
  if (errorMsg) {
    alert(errorMsg)
    return false
  }
}

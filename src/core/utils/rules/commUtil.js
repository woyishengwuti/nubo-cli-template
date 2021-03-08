/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-04-02 10:28:24
 * @ Description: 工具函数
 */

export default {
  /** *************根据指定的格式，格式化时间（如：yyyy-MM-dd hh:mm:ss）*****************/
  dateFmt(time, fmt) {
    // 若为时间戳，转为时间对象
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }

    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  },

  isNullOrUndefined(arg) {
    return arg === '' || arg === null || arg === undefined || arg === 'undefined'
  },
  /**
   * 字符串以 某个字符 开头
   * @param  {[type]}  str [目标字符串]
   * @param  {[type]}  tag [目标字符]
   * @return {Boolean}     [boolean]
   */
  isBeginOfStr(str, tag) {
    const fdStart = str.indexOf(tag)
    return fdStart === 0
  },
  /**
   * 对象中所有属性的值去除空格
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  trimAttr(obj) {
    Object.keys(obj).forEach(function(key) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(/(^\s*)|(\s*$)/g, '')
      } else if (typeof obj[key] === 'object') {
        if (obj[key] != null) {
          Object.keys(obj[key]).forEach(function(subKey) {
            this.trimAttr(obj[key])
          })
        }
      }
    })
    return obj
  },
  /**
   * 判断文件是否为xx格式
   */
  fileTypeJudge(fileName, tag) {
    const fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
    return fileType === tag
  },
  uuid() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    var uuid = s.join('')
    return uuid
  },
  /** 时间差转天时分 */
  SecondToDate(msd) {
    var time = msd
    if (time != null && time != '') {
      if (time > 60 && time < 60 * 60) {
        time =
          parseInt(time / 60.0) +
          '分' +
          parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
          '秒'
      } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        time =
          parseInt(time / 3600.0) +
          '时' +
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
          '分' +
          parseInt(
            (parseFloat(
              (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
            ) -
              parseInt(
                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
              )) *
            60
          ) +
          '秒'
      } else if (time >= 60 * 60 * 24) {
        time =
          parseInt(time / 3600.0 / 24) +
          '天' +
          parseInt(
            (parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24
          ) +
          '时' +
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
          '分' +
          parseInt(
            (parseFloat(
              (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
            ) -
              parseInt(
                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
              )) *
            60
          ) +
          '秒'
      } else {
        time = parseInt(time) + '秒'
      }
    }
    return time
  },
  toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function(item) {
      delete item.children
    })
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {}
    data.forEach(function(item) {
      map[item.orgNo] = item
    })
    var val = []
    data.forEach(function(item) {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      var parent = map[item.porgNo]
      // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        (parent.children || (parent.children = [])).push(item)
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item)
      }
    })
    return val
  },

  // 对象序列化
  createUrl(data) {
    var arr = []
    for (var p in data) { arr.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p])) }
    return arr.join('&')
  },

  /*
  * 时转天和时
  * */
  fmtHourToDateAndHour(hours) {
    if (!hours) {
      return '-'
    }
    const h = parseFloat(hours)
    if (h < 24) {
      return h + '小时'
    }
    if (h > 24) {
      const t = h % 24
      const d = (h - t) / 24
      return `${d}天${t}小时`
    }
  },
  delZeroLength(data, childrenKey) {
    // 递归删除数组长度为空的[childrenKey]属性
    for (const item of data) {
      if (item[childrenKey] && item[childrenKey].length <= 0) {
        delete item[childrenKey]
      } else {
        this.delZeroLength(item[childrenKey], childrenKey)
      }
    }
  }
}

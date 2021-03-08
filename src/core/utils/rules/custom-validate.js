/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-04-02 10:31:45
 * @ Description: 自定义表单验证规则
 */

export default {
  // 是否手机或者固话
  isPhoneOrTel(str) {
    const reg = /(^1\d{10}$)|(^0\d{2,3}-?\d{7,8}$)|(\d{7,8}$)/
    return reg.test(str)
  },
  // 是否手机
  isPhone(str) {
    const reg = /^1[3|5|4|6|7|8|9]\d{9}$/
    // const reg = /^(0|86|17951)?(13[0-9]|15[0123456789]|166|17[3678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/
    return reg.test(str)
  },
  // 是否固话
  isTel(str) {
    const reg = /^0\d{2,3}-?\d{7,8}$/
    return reg.test(str)
  },
  // 是否传真
  isFax(str) {
    const reg = /^(\d{3,4}-)?\d{7,8}$/
    return reg.test(str)
  },
  // 是否邮箱
  isEmail(str) {
    const reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
    return reg.test(str)
  },
  // 是否URL地址
  isHttpUrl(str) {
    const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/
    return reg.test(str)
  },
  // 是否邮政编码
  isZipCode(str) {
    const reg = /^\d{6}$/
    return reg.test(str)
  },
  // 是否整数
  isIntNum(str) {
    const reg = /^[1-9]*[1-9][0-9]*$/
    return reg.test(str)
  },
  // 是否整数包含0
  isIntNumOrZero(str) {
    const reg = /^(\+)?\d+$/
    return reg.test(str)
  },
  // 是否金钱
  isNumPot2(str) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    return reg.test(str)
  },
  // 是否经纬度
  isPosXY(str) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,8})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    return reg.test(str)
  },
  // 是否IdNum
  isIdNum(str) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(str)
  },
  // 是否身份证号
  isIdCard(str) {
    const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    return reg.test(str)
  },
  // 是否日期
  isDate(str) {
    const reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/
    return reg.test(str)
  },
  // 只能下划线、字母和数字
  isUserName(str) {
    // const reg = /^[\u4E00-\u9FA5a-zA-Z0-9_.]{2,250}$/
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[\u4E00-\u9FA5a-zA-Z0-9_.）（)(\-\——\—]{2,}$/
    return reg.test(str)
  },
  isHighUserName(str) {
    // const reg = /^[\u4E00-\u9FA5a-zA-Z0-9_.]{2,250}$/
    const reg = /^(?![0-9]+$)[\u4E00-\u9FA5a-zA-Z0-9]{2,}$/
    return reg.test(str)
  },
  isNoIdCard(str) {
    const reg = /^[0-9a-zA-Z-_]+$/
    return reg.test(str)
  },
  // 只能下划线、字母、点和数字   地址
  isAddr(str) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[\u4E00-\u9FA5a-zA-Z0-9_.]{3,}$/
    return reg.test(str)
  },
  // 数字和小数点后两位
  isFLoatNum(str) {
    const reg = /^[0-9]*\.[0-9]{0,2}$/
    return reg.test(str)
  },
  isRunCap(str) {
    const reg = /^\d+(?=\.{0,1}\d{1,2}$|$)/
    let active = true
    if (str > 250) {
      active = false
    }
    return reg.test(str) && active
  },
  // 是否为空
  isEmpty(str) {
    const reg = /\S/
    return reg.test(str)
  },
  isIP(str) {
    const reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/
    return reg.test(str)
  }
}

// 地址
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}


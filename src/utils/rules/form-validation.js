/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-03 16:38:13
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-04-02 10:35:29
 * @ Description: 自定义表单验证规则 定义 type 规则时 不用做非空验证 只需要传入 required: true 即可
 */

import vaild from './custom-validate.js'

// 手机号或固话输入是否正确
export var validPhone = (rule, value, callback) => {
  if (rule.required && !value) {
    callback(new Error(rule.message))
  } else if (rule.required && !vaild.isPhoneOrTel(value)) {
    callback(new Error(rule.message))
  } else if (!rule.required && value && !vaild.isPhoneOrTel(value)) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}

// 验证手机号和固话
export var isvalidatePhoneOrTel = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!vaild.isPhoneOrTel(value)) {
      callback(new Error('您输入的联系电话不正确'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 验证手机号
export var isvalidatePhone = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!vaild.isPhone(value)) {
      callback(new Error('您输入的手机号码不正确'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 验证固话
export var isvalidateTel = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!vaild.isTel(value)) {
      callback(new Error('您输入的固定电话不正确'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

/* 含有非法字符(只能输入字母、汉字)*/
export var isvalidateRegexn = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!vaild.isPhoneOrTel(value)) {
      callback(new Error('含有非法字符(只能输入字母、汉字)'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 请输入正整数
export var isvalidateInteger = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!vaild.isIntNum(value)) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 请输入正整数或者0
export var isvalidateIntegerOrZero = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!vaild.isIntNumOrZero(value)) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 请输入身份证号码
export var isvalidateIdCard = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!vaild.isIdCard(value)) {
      callback(new Error('您输入的证件号码不正确'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 请输入URL
export var isvalidateUrl = (rule, value, callback) => {
  if (value != null && value !== '') {
    if (!vaild.isHttpUrl(value)) {
      callback(new Error('网站URL输入不合法'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 只能输入字母数字下划线
export var isUserName = (rule, value, callback) => {
  if (!vaild.isUserName(value)) {
    callback(new Error('可输入汉字、字母、点、数字和下划线，不能全为数字或字母'))
  } else {
    callback()
  }
}

// 只能输入字母数字
export var isNoIdCard = (rule, value, callback) => {
  if (!vaild.isNoIdCard(value)) {
    callback(new Error('只能输入字母、数字'))
  } else {
    callback()
  }
}

export var isEmpty = (rule, value, callback) => {
  if (!vaild.isEmpty(value)) {
    callback(new Error('名称不能为空'))
  } else {
    callback()
  }
}

export var isIP = (rule, value, callback) => {
  if (!vaild.isIP(value)) {
    callback(new Error('ip地址格式不正确'))
  } else {
    callback()
  }
}

//  参数 item
//  required true  必填项
//  maxLength  字符串的最大长度
//  min 和 max 必须同时给 min < max  type=number

export default {
  validateRules(item) {
    const rules = []
    if (item.required) {
      if (item.trigger === 'change') {
        rules.push({
          required: true,
          message: item.title + '为必选项',
          trigger: item.trigger
        })
      } else {
        rules.push({
          required: true,
          message: item.title + '为必填项'
          // trigger: "blur"
        })
      }
    }

    if (item.maxLength) {
      rules.push({
        min: 1,
        max: item.maxLength,
        message: '最多输入' + item.maxLength + '个字符',
        trigger: 'blur'
      })
    }

    if (item.min && item.max) {
      rules.push({
        min: item.min,
        max: item.max,
        message: item.title + '必须在' + item.min + '~' + item.max + '之间',
        trigger: 'blur'
      })
    }

    if (item.type) {
      const type = item.type
      switch (type) {
        case 'email':
          rules.push({
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          })
          break
        case 'PhoneOrTel':
          rules.push({ validator: isvalidatePhoneOrTel, trigger: 'blur' })
          break
        case 'phone':
          rules.push({ validator: isvalidatePhone, trigger: 'blur' })
          break
        case 'tel':
          rules.push({ validator: isvalidateTel, trigger: 'blur' })
          break
        case 'regexn':
          rules.push({ validator: isvalidateRegexn, trigger: 'blur' })
          break
        case 'integer':
          rules.push({ validator: isvalidateInteger, trigger: 'blur' })
          break
        case 'integerOrZero':
          rules.push({ validator: isvalidateIntegerOrZero, trigger: 'blur' })
          break
        case 'url':
          rules.push({ validator: isvalidateUrl, trigger: 'blur' })
          break
        case 'UserName':
          rules.push({ validator: isUserName, trigger: 'blur' })
          break
        case 'isNoIdCard':
          rules.push({ validator: isNoIdCard, trigger: 'blur' })
          break
        case 'idCard':
          rules.push({ validator: isvalidateIdCard, trigger: 'blur' })
          break
        case 'isEmpty':
          rules.push({ validator: isEmpty, trigger: 'blur' })
          break
        case 'isIP':
          rules.push({ validator: isIP, trigger: 'blur' })
          break
        default:
          rules.push({})
          break
      }
    }

    return rules
  }
}

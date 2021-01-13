/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-03-15 20:01:36
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-11 09:29:56
 * @ Description: 处理模块下的多语言文件
 */

const fileDeal = (cate) => {
  if (!cate) return
  const modulesLangs = {}
  let reqModules = null

  if (cate === 'zh-CN') {
    reqModules = require.context('@modules', true, /zh-CN\.js$/)
  } else if (cate === 'en-US') {
    reqModules = require.context('@modules', true, /en-US\.js$/)
  } else {
    reqModules = require.context('@modules', true, /zh-CN\.js$/)
  }

  try {
    let modulesLang = []
    reqModules.keys().forEach(key => {
      // 读取出文件中的default模块
      modulesLang = modulesLang.concat(reqModules(key).default)
    })

    // console.log('reqModules', modulesLang, reqModules)
    modulesLang.forEach(v => {
      for (const _v in v) {
        modulesLangs[_v] = v[_v]
      }
    })
  } catch (e) {
    console.log(e)
  }

  return modulesLangs
}

export default fileDeal

/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:35:45
 * @ Description: 中文
 */

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import fileDeal from '@/utils/file-deal'
const modulesLangs = fileDeal('zh-CN')

export default {
  name: '中文',
  title: '测试文件',
  ...zhLocale,
  ...modulesLangs,
  general: {
    test: '测试'
  }
}

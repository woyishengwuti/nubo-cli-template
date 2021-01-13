/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-13 10:35:24
 * @ Description: 英文
 */

import enLocale from 'element-ui/lib/locale/lang/en'
import fileDeal from '@/utils/file-deal'
const modulesLangs = fileDeal('en-US')

export default {
  name: '英文',
  title: 'test file',
  ...enLocale,
  ...modulesLangs,
  general: {
    test: 'test'
  }
}

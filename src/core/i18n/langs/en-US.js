/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-04-16 09:54:45
 * @ Description: 英文
 */

import enLocale from 'element-ui/lib/locale/lang/en'
import fileDeal from '@core/utils/file-deal'
const modulesLangs = fileDeal('en-US')

export default {
  // toolbar
  name: '英文',
  title: 'test file',
  ...enLocale,
  ...modulesLangs
}

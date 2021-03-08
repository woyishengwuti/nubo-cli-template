/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-04-02 10:22:32
 * @ Description: 国际化
 */

import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import messages from './langs'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.lang || 'cn',
  messages
})
locale.i18n((key, value) => i18n.t(key, value))

export default i18n

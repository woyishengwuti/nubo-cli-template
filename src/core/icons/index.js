/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-01-08 14:49:47
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-11-12 11:22:16
 * @ Description: 注册到全局的 svg-icons
 */

import Vue from 'vue'
import SvgIcon from '@core/components/SvgIcon'// svg component

// 全局注册
Vue.component('svg-icon', SvgIcon)
const requireAll = requireContext => requireContext.keys().map(requireContext)

const req = require.context('./svg', false, /\.svg$/)
const ireveboardSVG = require.context('@/frames/modulesboard/icons', false, /\.svg$/)

requireAll(req)
requireAll(ireveboardSVG)

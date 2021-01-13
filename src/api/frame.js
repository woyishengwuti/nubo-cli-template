/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-04-02 10:21:58
 * @ Description: 模拟数据
 */

import menus from './menus'

export function getMenus() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: menus
      })
    }, 100)
  })
}

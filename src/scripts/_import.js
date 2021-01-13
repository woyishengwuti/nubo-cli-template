/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-08 17:11:12
 * @ Description: 通用导入
 */

export default async(type, name) => {
  const _import = await import('./_import_development')
  const puzzle = await _import.default(type, name)
  return puzzle.default
}

/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-08 14:21:09
 * @ Description: 通用导入
 */

export default async(type, name) => {
  const _import = await import('./_import_')
  const puzzle = await _import.default(type, name)
  return puzzle.default
}

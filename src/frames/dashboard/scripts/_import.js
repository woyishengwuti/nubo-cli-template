/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:50
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-07-14 18:01:49
 * @ Description: 通用导入
 */

export default async(name) => {
  const _import = await import('./_import_')
  const puzzle = await _import.default(name)
  return puzzle.default
}

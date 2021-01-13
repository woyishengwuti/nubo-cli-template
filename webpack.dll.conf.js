/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-12-17 09:35:02
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-12-18 14:17:47
 * @ Description: DLL化
 */

const path = require('path')
const webpack = require('webpack')
// function resolve(dir) {
//   return path.join(__dirname, '..', dir)
// }
const staticPath = path.resolve(process.cwd(), 'public')

module.exports = {
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    vendor: [path.resolve(staticPath, 'dll', 'vendor.js')]
  },
  output: {
    path: path.join(__dirname, 'public/dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]' // vendor.dll.js中暴露出的全局变量名
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'public/dll', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}

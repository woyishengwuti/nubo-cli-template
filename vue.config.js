/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:51
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-07-05 15:03:39
 * @ Description: vue-cli3配置文件
 */

const path = require('path')

// gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|svg)(\?.*)?$/i
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 用来查看项目svg
// const WebpackSvgPlugin = require('webpack-svg-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const staticPath = process.env.NODE_ENV === 'production' ? {
  css: ['./plugins/element-ui-2.13.0/index.css'],
  js: [
    './plugins/vue-2.6.11/vue.min.js',
    './plugins/vuex-3.1.2/vuex.min.js',
    './plugins/moment-2.24.0/moment-with-locales.min.js',
    './plugins/axios-0.19.0/axios.min.js',
    './plugins/element-ui-2.13.0/index.js',
    './plugins/vue-router-3.1.3/vue-router.min.js',
    './plugins/echarts-4.8.0/echarts.min.js'
  ]
} : {
  js: [],
  css: []
}

module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  outputDir: 'dist-' + process.env.VUE_APP_FRAME,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pages: {
    index: {
      entry: `src/core/main.js`,
      template: `public/index.html`,
      filename: `index.html`,
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      static: staticPath
    }
  },
  configureWebpack: {
    plugins: [
      // new WebpackSvgPlugin({
      //   filesPath: resolve('src')
      // }),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions, // 匹配文件名
        threshold: 10240, // 对10K以上的数据进行压缩
        minRatio: 0.6,
        deleteOriginalAssets: false
      }),
      new BundleAnalyzerPlugin()
    ]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      var externals = {
        'vue': 'Vue',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'moment': 'moment',
        'echarts': 'echarts'
      }

      config.externals(externals)
    }

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@core', resolve('src/core'))
      .set('@dashboard', resolve('src/frames/dashboard'))
      .set('@transboard', resolve('src/frames/transboard'))

    // set svg-sprite-loader
    // 下面不能使用别名加载
    config.module
      .rule('svg')
      .exclude.add(resolve('src/core/icons/svg'))
      .add(resolve('src/frames/dashboard/icons'))
      .add(resolve('src/frames/transboard/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/core/icons/svg'))
      .add(resolve('src/frames/dashboard/icons'))
      .add(resolve('src/frames/transboard/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    // config.resolve.symlinks(true)
    // config.entry('index').add('babel-polyfill')
  },
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    requireModuleExtension: true,
    extract: false,
    sourceMap: false,
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 100,
            exclude: /(node_modules)/i,
            minPixelValue: 2
          })
        ]
      },
      sass: {
        // 全局变量
        prependData: '@import "src/frames/dashboard/styles/var.scss"; @import "src/frames/dashboard/styles/mixin.scss";'
      }
    }
  }
}

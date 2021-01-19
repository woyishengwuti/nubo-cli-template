/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-02 09:49:51
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-01-19 16:55:49
 * @ Description: vue-cli3 配置文件
 */

const path = require('path')

// gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
  // 是否使用包含运行时编译器的 Vue 构建版本。true 可以在 Vue 组件中使用 template 选项了，但会让应用额外增加 10kb 左右。
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pages: {
    index: {
      entry: `src/main.js`,
      template: `public/index.html`,
      filename: `index.html`,
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      static: staticPath
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions, // 匹配文件名
        threshold: 10240, // 对10K以上的数据进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false // 是否删除源文件
      }),
      // new webpack.DllReferencePlugin({
      //   context: process.cwd(),
      //   manifest: require('./public/dll/vendor-manifest.json')
      // })
      new BundleAnalyzerPlugin({
        analyzerPort: 10000 // 运行后的端口号
      })
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
      .set('@modules', resolve('src/modules'))

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/core/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://api.com:8081',
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
            rootValue: 16,
            exclude: /(node_modules)/i,
            minPixelValue: 2
          })
        ]
      },
      sass: {
        prependData: `@import "src/styles/var.scss";@import "src/styles/mixin.scss";`
      }
    }
  }
}

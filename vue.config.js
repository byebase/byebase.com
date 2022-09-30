const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const CompressionPlugin = require('compression-webpack-plugin')
const Timestamp = new Date().getTime();
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/", //部署应用包时的基本 URL
    lintOnSave: false, //关闭eslint规范
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.entry.app = ["babel-polyfill", resolve('src/main.js')],
        config.resolve.alias.set('@', resolve('src')).set('assets', resolve('src/assets')).set('components', resolve('src/components'))
        config.plugins.delete('prefetch')
    },
    configureWebpack: (config) => { // webpack 配置
        config["externals"] = {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'element-ui': 'ELEMENT'
        }
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            // 去掉打印
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

            config.output.filename =`js/[name]_${Timestamp}.js`  // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            config.output.chunkFilename =`js/[name]_${Timestamp}.js` 

            config.plugins.push(new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, //匹配文件名
                threshold: 10240, //对超过10k的数据进行压缩
                deleteOriginalAssets: false //是否删除原文件
            }))
        }
    },

}
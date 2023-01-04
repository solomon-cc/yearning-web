const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    publicPath: '/',
    assetsDir: './assets',
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    },
    runtimeCompiler: true,
    productionSourceMap: false,

    devServer: {
        port: 80,
        disableHostCheck: true,
        proxy: 'http://localhost:8000'

    },


    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    }
}

module.exports = {
    //devServer配置说明
    //https://www.cnblogs.com/edwardwzw/p/13261418.html
    devServer: {
        // publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
        proxy: {
            '/api': {
                target: 'http://vue.shaobaitao.cn',
                ws: true,
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': '/'
                // },
            }
        }
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],

}
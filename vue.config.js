module.exports = {
    //devServer配置说明
    //https://www.cnblogs.com/edwardwzw/p/13261418.html
    devServer: {
        proxy: {
            '/api': {
                target: 'http://vue.shaobaitao.cn',
                ws: true,
                changeOrigin: true
            }
        }
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}
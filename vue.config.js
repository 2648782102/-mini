const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./", // 打包 配置这个可以先本地查看下 效果
  productionSourceMap: false, // 调试文件的功能关闭 能加快打包
  devServer: {
    proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'https://netease-cloud-music-api-lilac-one-32.vercel.app',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
    }
    // 简易代理
    // proxy: 'https://netease-cloud-music-api-lilac-one-32.vercel.app',// 代理目标的基础路径
  }
})


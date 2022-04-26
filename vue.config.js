// 配置element-plus组件自动按需导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = {
  devServer: {
    // 开发编译时自动浏览器
    // open: true
  },
  configureWebpack: {
    plugins: [
      // 配置element-plus组件自动按需导入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      // 配置element-plus组件自动按需导入
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
}
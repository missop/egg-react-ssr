const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染
  static: {
    // 设置Node应用的静态资源目录，为了生产环境读取静态资源文件
    prefix: '/',
    dir: resolvePath('dist')
  },
  routes: [
    {
      path: '/home',
      exact: true,
      Component: () => (require('../web/views/home/index').default), // 这里使用一个function包裹为了让它延迟require
      controller: 'page',
      handler: 'index',
      meta: {
        title: 'home'
      }
    },
  ],
  baseDir: resolvePath('../'),
  injectCss: [
    // `/static/css/page.chunk.css`
  ], // 客户端需要加载的静态样式表
  injectScript: [
    `/static/js/runtime~page.js`,
    `/static/js/vendor.chunk.js`,
    `/static/js/page.chunk.js`
  ], // 客户端需要加载的静态资源文件表
  serverJs: resolvePath(`../dist/page.server.js`),
  layout: resolvePath(`../dist/layout.server.js`),
  useCDN: false
}

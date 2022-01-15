const resolvePath = (path) => require('path').resolve(__dirname, path)
const ssr = require('./config.ssr');

const API_GATEWAY = (typeof window=="object" && window.location.href.indexOf("perfma.com")>-1) ?
'https://www.perfma.com':
'http://www.saas.perfma-inc.net/'
module.exports = {
  keys: 'egg-ssr',
  static: {
    prefix: '/',
    dir: [resolvePath('../dist'), resolvePath('../app/public')]
  },
  ssr,
  // cdnHost: `https://a.perfma.net/fe/www/${pkgJson.version}`,
  cdnHost: ``,
  API_GATEWAY,
  cluster: {
    listen: {
      port: 7001, // 默认7001
      hostname: '0.0.0.0',
    }
  }
}

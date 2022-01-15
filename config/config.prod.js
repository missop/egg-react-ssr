const resolvePath = (path) => require('path').resolve(__dirname, path)
const pkgJson = require('../package.json');

module.exports = {
  static: {
    prefix: `/fe/www/${pkgJson.version}`,
    dir: [resolvePath('../dist'), resolvePath('../app/public')]
  },
  cdnHost: `https://a.perfma.net/fe/www/${pkgJson.version}`,
  API_GATEWAY: 'http://192.168.0.19',
  cluster: {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    }
  },
}

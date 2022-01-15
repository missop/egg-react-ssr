'use strict'

const ssrRoute = require('./router/ssr');
const appRoute = require('./router/app');

module.exports = app => {
  ssrRoute(app);
  appRoute(app);
}

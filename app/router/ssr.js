'use strict'

module.exports = app => {
  const { router, controller, config, } = app
  config.ssr.routes.map(route => {
    router.get(`${route.path}`, controller[route.controller][route.handler])
  })
  // router.get('/',controller)
}

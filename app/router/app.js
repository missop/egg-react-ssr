'use strict'

module.exports = app => {
  const { router, controller, } = app;

  // 接口转发
  // router.get('/inner/api/index', controller.api.index)
  // 页面重定向
  router.get('*', controller.page.redirectHome)
}

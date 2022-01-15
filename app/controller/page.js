const Controller = require('egg').Controller
const renderToStream = require('ykfe-utils/lib/renderToStream')
const mobile = require('is-mobile')

class PageController extends Controller {
  async index() {
    const { ctx } = this
    try {
      ctx.type = 'text/html'
      ctx.status = 200
      const config = Object.assign(ctx.app.config, ctx.app.config.ssr)
      global.__IS_MOBILE__ = config.isMobile = !!mobile({ ua: ctx.request })
      const stream = await renderToStream(ctx,config)
      ctx.body = stream
    } catch (error) {
      ctx.logger.error(`Page Controller renderToStream Error`, error)
    }
  }

 redirectHome(){
   const {ctx} = this
   ctx.status = 301
   ctx.redirect('/home')
 }
}

module.exports = PageController

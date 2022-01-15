'use strict'

const { Service } = require('egg')
class ApiService extends Service {
  async newsIndex ({ page = 1, size = 10 } = {}) {
    const API_POST_LIST = `${this.ctx.app.config['API_GATEWAY']}/api/console/post/list?page=${page}&size=${size}`;
    const res = await this.ctx.curl(API_POST_LIST, {
      dataType: 'json',
    });
    return res ? res.data : null;
  }
}

module.exports = ApiService

import request from 'web/utils/request'

// 提交表单
export function form(data) {
  return request({
    url: '/api/community/website/submit',
    method: 'post',
    data
  })
}

// 短信验证码
export function smsCode(phone) {
  return request({
    url: '/api/community/website/sendSms',
    method: 'get',
    params: {
      phone
    }
  })
}
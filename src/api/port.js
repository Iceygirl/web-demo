// 接口

import {
    ajaxLogin
} from './axios'

// 获取验证码
export function getCode() {
  let url = '/sszhxf-web/user2/validation'
  return ajaxLogin(url)
}

// 登录
export function toLogin(data) {
  let url = '/sszhxf-web/user2/login'
  return ajaxLogin(url,data)
}
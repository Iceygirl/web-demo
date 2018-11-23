// 接口

import {
    ajaxLogin,
    ajaxPost
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

// 退出登录
export function logout(data) {
  let url = '/sszhxf-web/user/logOut'
  return ajaxPost(url,data)
}

// 修改密码
export function editPsw(data) {
  let url = '/sszhxf-web/user/changePW'
  return ajaxPost(url,data)
}

// 获取村居列表
export function getiNameList(data) {
  let url = '/sszhxf-web/iName/list'
  return ajaxPost(url,data)
}

// 获取村居列表
export function editiName(data) {
  let url = '/sszhxf-web/iName/edit'
  return ajaxPost(url,data)
}


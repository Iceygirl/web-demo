// 封装的axios

import axios from 'axios'
import { httpURL } from './config'
import { getLocalStorage } from 'js/dom'

export function ajaxLogin(url, data) {
  url = `${httpURL}${url}`
  return axios({
      method: 'post',
      url: url,
      data
    })
    .then((res) => {
      return Promise.resolve(res.data)
    }) 
}
export function ajaxPost(url, data) {
  url = `${httpURL}${url}`
  return axios({
      method: 'post',
      url: url,
      params: {
        token: getLocalStorage('userinfo') ? getLocalStorage('userinfo').token : ''
      },
      data
    })
    .then((res) => {
      let data = res.data;
      return Promise.resolve(data)
    })
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

 /* 项目入口文件
    @ 周小曼
    @ 2018-10-17
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


import iView from 'iview'
import 'iview/dist/styles/iview.css'

import 'iconfont/iconfont.css'

import 'style/base.scss'

Vue.use(iView)
Vue.use(store)
Vue.config.productionTip = false
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>' 
})

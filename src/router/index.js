import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/Login'
import Home from 'components/Home'
// 主页
import Main from 'components/Main'
// 辖区管理
import AreaManage from 'components/Manage/AreaManage'
// 巡查员管理
import PatrolmanManage from 'components/Manage/PatrolmanManage'
// 场所管理
import SiteManage from 'components/Manage/SiteManage'
// 日结报表下载
import DialyReport from 'components/DataStatistics/DialyReport'
// 累计排查统计
import TotalReport from 'components/DataStatistics/TotalReport'
// 使用帮助
import UseHelp from 'components/UseHelp'

 
Vue.use(Router)
 
export default new Router({
  routes: [
    { 
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[{
          path:'/home/main',
          name:'main',
          component:Main
        },{
          path:'/home/areaManage',
          name:'areaManage',
          component:AreaManage
        },{
          path:'/home/patrolmanManage',
          name:'patrolmanManage',
          component:PatrolmanManage
        },{
          path:'/home/siteManage', 
          name:'siteManage',
          component:SiteManage
        },{
          path:'/home/dialyReport',
          name:'dialyReport',
          component:DialyReport
        },{
          path:'/home/totalReport',
          name:'totalReport',
          component:TotalReport
        },{
          path:'/home/useHelp',
          name:'useHelp',
          component:UseHelp
        }]
    },
  ]
})

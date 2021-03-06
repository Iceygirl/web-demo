// 全局的数据

// 首页左侧nav的数据
export const navDatas = [{
  name:'main',
  title:'主页',
  link:'/home/main',
  icon:'icon-tianchongxing-'
},{
  name:'areaManage',
  title:'辖区管理',
  link:'/home/areaManage',
  icon:'icon-lvzhou_fenzhichangsuo'
},{
  name:'patrolmanManage',
  title:'巡查员管理', 
  link:'/home/patrolmanManage',
  icon:'icon-guanlikehu'
},{
  name:'siteManage',
  title:'场所管理',
  link:'/home/siteManage',
  icon:'icon-jianzhu'
},{
  name:'schedule',
  title:'巡查进度',
  link:'/home/schedule',
  icon:'icon-jindu'
},{
  name:'dataStatistics',
  title:'数据统计',
  icon:'icon-tongji',
  children:[{
    name:'dialyReport',
    title:'日结报表下载',
    link:'/home/dialyReport'
  },{
    name:'totalReport',
    title:'累计排查统计',
    link:'/home/totalReport'
  }]
},{
  name:'useHelp', 
  title:'使用帮助',
  link:'/home/useHelp',
  icon:'icon-gerenzhongxin-shiyongbangzhu'
},]


// 面包屑数据
export const breadNavs = [{
  name:'main',
  title:'主页',
  link:'/home/main',
  icon:'icon-tianchongxing-'
},{
  name:'areaManage',
  title:'辖区管理',
  link:'/home/areaManage',
  icon:'icon-lvzhou_fenzhichangsuo'
},{
  name:'patrolmanManage',
  title:'巡查员管理', 
  link:'/home/patrolmanManage',
  icon:'icon-guanlikehu'
},{
  name:'siteManage',
  title:'场所管理',
  link:'/home/siteManage',
  icon:'icon-jianzhu'
},{
  name:'schedule',
  title:'巡查进度',
  link:'/home/schedule',
  icon:'icon-jindu'
},{
  name:'scheduleInfo', 
  title:'巡查详情',
  isLink:true,
  parentTit:'巡查进度',
  parentUrl:'/home/schedule',
  parentIcon:'icon-jindu',
  link:'/home/scheduleInfo',
  icon:'icon-jindu'
},{
  name:'editSchedule', 
  title:'修改记录',
  isLink:true,
  parentTit:'巡查进度',
  parentUrl:'/home/schedule',
  parentIcon:'icon-jindu',
  link:'/home/editSchedule',
  icon:'icon-jindu'
},{ 
  name:'dataStatistics',
  title:'数据统计',
  icon:'icon-tongji'
},{
  name:'dialyReport',
  isLink:false,
  parentTit:'数据统计',
  parentIcon:'icon-tongji',
  title:'日结报表下载',
  link:'/home/dialyReport',
  icon:'icon-04'
},{
  name:'totalReport',
  isLink:false,
  parentTit:'数据统计',
  parentIcon:'icon-tongji',
  title:'累计排查统计',
  link:'/home/totalReport',
  icon:'icon-rank_and_window'
},{
  name:'useHelp', 
  title:'使用帮助',
  link:'/home/useHelp',
  icon:'icon-gerenzhongxin-shiyongbangzhu'
},]


// 管理处下拉数据
export const subAreaDatas = [{
  value:'官窑管理处',
  label:'官窑管理处'
},{
  value:'小塘管理处',
  label:'小塘管理处'
},{
  value:'罗村管理处',
  label:'罗村管理处'
},{
  value:'大圃管理处',
  label:'大圃管理处'
}]


// 管理处下拉数据
export const enabledDatas = [{
  value:'全部',
  label:'全部'
},{
  value:'已禁用',
  label:'已禁用'
},{
  value:'未禁用',
  label:'未禁用'
}]
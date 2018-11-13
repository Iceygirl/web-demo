<template>
  <div class="Bread">
    <Breadcrumb separator=">">
        <BreadcrumbItem to="/home/main">
            <i class="iconfont icon-tianchongxing-"></i> 
            主页
        </BreadcrumbItem>
        <BreadcrumbItem :to="routerInfo.secondLink ? routerInfo.secondUrl : ''"  v-if="!routerInfo.isHome && routerInfo.secondLink">
            <i class="iconfont" :class="routerInfo.secondIcon"></i> 
            {{routerInfo.secondTit}}
        </BreadcrumbItem>
        <BreadcrumbItem :to="routerInfo.childLink"  v-if="!routerInfo.isHome">
            <i class="iconfont" :class="routerInfo.childIcon"></i> 
            {{routerInfo.childTit}}
        </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script> 
import { breadNavs } from 'js/gobalDatas'
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['routerName']),
    routerInfo() {
      let childTit = '', childLink = '', childIcon = '', secondTit = '',secondUrl = '',secondIcon = '', isHome = false, secondLink = false
      isHome = this.routerName === 'main' ? true : false 
      breadNavs.forEach(item => { 
        if(item.name === this.routerName) {
            childTit = item.title
            childLink = item.link
            childIcon = item.icon
            // 有中间的第二层存在
            if(item.isLink !== undefined) {
              secondLink = true
              secondTit = item.parentTit
              secondIcon = item.parentIcon
              // 判断是否是可以点击的链接
              if(item.isLink === true) {
                secondUrl = item.parentUrl
              } else {
                secondUrl = '' 
              }
            }
        }
      })
      return { childTit, childTit, childIcon, isHome, secondLink, secondUrl, secondTit, secondIcon}
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.bread {
  
}
</style> 

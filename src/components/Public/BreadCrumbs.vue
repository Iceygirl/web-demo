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
        <BreadcrumbItem :to="routerInfo.endLink"  v-if="!routerInfo.isHome">
            <i class="iconfont" :class="routerInfo.endIcon"></i> 
            {{routerInfo.endTit}}
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
      let endTit = '', endLink = '', endIcon = '', secondTit = '',secondUrl = '',secondIcon = '', isHome = false, secondLink = false
      isHome = this.routerName === 'main' ? true : false 
      breadNavs.forEach(item => { 
        if(item.name === this.routerName) {
            endTit = item.title
            endLink = item.link
            endIcon = item.icon
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
      return { endTit, endLink, endIcon, isHome, secondLink, secondUrl, secondTit, secondIcon}
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style> 

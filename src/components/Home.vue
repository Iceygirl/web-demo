<template>
  <div class="Home">
    <div class="HomeHeader">
       <head-page></head-page>
    </div>
    <div class="HomeMain clearfix">
      <div class="leftNav fl">
        <left-nav></left-nav>
      </div>
      <div class="content fl">
        <bread-crumbs></bread-crumbs>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
  
<script>
import Header from 'public/Header'
import SideNav from 'public/SideNav' 
import BreadCrumbs from 'public/BreadCrumbs'  
export default {
  data () {
    return {
    }
  },
  components: {
    'head-page': Header,
    'left-nav': SideNav,
    'bread-crumbs':BreadCrumbs
  }
} 
</script>

<style lang="scss" scoped>
.Home {
  height:100%;
  .HomeHeader {
    width:100%;
    height:50px;
    line-height:50px;
    background-color:#CAF2FE;
  }
  .HomeMain {
    height:calc(100% - 50px); 
    .leftNav {
      width:200px;
      height:100%;
    }
    .ivu-menu {
      width:100% !important;
      height:100% !important;
    }
    .content {
      width:calc(100% - 200px);
      padding:20px;
    }
  }
}

</style>

<template>
  <div class="Home">
    <div class="HomeHeader">
       <head-page></head-page>
    </div>
    <div class="HomeMain">
      <left-nav></left-nav>
      <div class="HomeMain"></div>
    </div>
  </div>
</template>
 
<script>
import Header from 'public/Header'
import SideNav from 'public/SideNav'
export default {
  data () {
    return {
    }
  },
  components: {
    'head-page': Header,
    'left-nav': SideNav
  }
} 
</script>

<style lang="scss" scoped>
.HomeHeader {
  width:100%;
  height:50px;
  line-height:50px;
  background-color:#CAF2FE;
}
</style>

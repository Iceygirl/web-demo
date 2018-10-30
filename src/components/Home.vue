<template>
  <div class="Home">
    <div class="HomeHeader">
       <head-page></head-page>
    </div>
    <div class="HomeMain">
      <div class="HomeSideNav"></div>
      <div class="HomeMain"></div>
    </div>
  </div>
</template>
 
<script>
import Header from 'public/Header'
export default {
  data () {
    return {
    }
  },
  components: {
    'head-page': Header
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

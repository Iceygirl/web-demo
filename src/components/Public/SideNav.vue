<template>
    <Menu mode="vertical" theme="light" active-name="1">
      <!-- <template> -->
        <MenuItem  v-for="(item,index) in navs" :key="index" :name="item.name">
            <i class="iconfont" :class="item.icon" />
            {{item.title}}
        </MenuItem> 
      <!-- </template> -->
  </Menu>  
</template>

<script>
import { navDatas } from 'js/gobalDatas'
export default {  
  data () {
    return {
      navs:navDatas
    }
  }
}
</script>

<style scoped>

</style>

<template>
    <Menu mode="vertical" theme="light" accordion :active-name="routerName">
        <template  v-for="item in navs">
          <Menu-item  v-if="!item.children" :name="item.name" :key="item.name" @click.native="jumpTo(item.link,item.name)">
              <i class="iconfont" :class="item.icon" />
              {{item.title}}
          </Menu-item>
          <Submenu v-else :name="item.name" :key="item.name">
              <template slot="title">
                  <i class="iconfont" :class="item.icon"/>
                  {{item.title}}
              </template>
              <Menu-item v-for="(citem,cindex) in item.children" :name="citem.name" :key="cindex"  @click.native="jumpTo(citem.link,citem.name)">
                {{citem.title}}
              </Menu-item>
          </Submenu> 
        </template>
  </Menu>  
</template>

<script> 
import { navDatas } from 'js/gobalDatas'
import { mapState,mapMutations } from 'vuex'
export default {  
  data () {
    return {
      navs:navDatas
    }
  },
  computed: {
    ...mapState(['routerName'])
  },
  methods: {
    // 路由跳转
    jumpTo(link,name) {
      this.$router.push(link)
      this.set_routerName(name) 
      // console.log(this.$store.state.routerName)
    }, 
    ...mapMutations(['set_routerName']) 
  }
}
</script>

<style scoped>

</style>

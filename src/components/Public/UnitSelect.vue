<template>
  <div class="Select">
    <Select v-model="unit.subArea" class="selectItem" @keyup.enter.native="search">
        <Option v-for="item in subAreaData" :value="item.value" :key="item.value" clearable>{{ item.label }}</Option>
    </Select>
    <Button type="primary" @click="search">搜索</Button>
  </div>
</template>

<script> 
import { subAreaDatas } from 'js/gobalDatas'
export default {  
  data () { 
    return { 
      subAreaData:subAreaDatas,
      unit: {
        subArea: ''
      }
    }
  },
  methods: {
    search() {
      console.log(11)
    }
  }
}
</script>

<style lang="scss" scoped>
.Select { 
  padding:20px 0;
  .selectItem {
    width:160px;
  }
}

</style>

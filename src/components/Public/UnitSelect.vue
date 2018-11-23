<template>
  <div class="Select clearfix">
    <div class="fl">
      <Select v-model="unit.subArea" class="selectItem" @keyup.enter.native="search" clearable>
          <Option v-for="item in subAreaData" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary" @click="search">搜索</Button>
    </div>
    <div class="fr">
      <Button type="primary">导出列表</Button>
      <Button type="primary">导出勾选的内容</Button>
    </div>
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
      this.$emit('search',this.unit)
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

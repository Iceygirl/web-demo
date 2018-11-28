<template>
  <div class="Select clearfix">
    <div class="selectLeft fl">

      <!-- 巡查员启用禁用下拉 -->
      <Select v-model="unit.enabled" v-if="isEnabled" class="selectItem" @keyup.enter.native="search" clearable placeholder="请选择">
          <Option v-for="item in enabledData" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>

      <!-- 管理处下拉 -->
      <Select v-model="unit.subArea" v-if="isSubArea" class="selectItem" @keyup.enter.native="search" clearable placeholder="请选择管理处" @on-change="_getiName">
          <Option v-for="item in subAreaData" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> 

      <!-- 村居下拉 -->
      <Select v-model="unit.iName" v-if="isiName" class="selectItem" @keyup.enter.native="search" clearable placeholder="请选择村居" :disabled="this.unit.subArea === '' || this.unit.subArea === undefined">
          <Option v-for="item in iNameData" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
 
      <!-- 巡查员姓名输入框 -->
      <Input type="text" class="inputItem" v-model="unit.patrolmanName" v-if="isPatrolmanName" placeholder="请输入巡查员姓名"  @keyup.enter.native="search"  clearable></Input>

      <!-- 巡查员帐号输入框 -->
      <Input type="text" class="inputItem" v-model="unit.userName" v-if="isUserName" placeholder="请输入巡查员帐号"  @keyup.enter.native="search"  clearable></Input>

      <Button type="primary" @click="search">搜索</Button>
    </div>
    <div class="selectRight fr">
      <Button type="primary" v-if="isAddPatrolMan" @click="addPatrolman">新增巡查员</Button>
      <Button type="primary" v-if="isExport">导出列表</Button>
    </div>
  </div>
</template>
 
<script> 
import { subAreaDatas, enabledDatas } from 'js/gobalDatas'
import { getiNameList } from 'api/port'
import { ERR_OK, pages, fuzzyQueryStr } from 'api/config'
import { backToLogin, cloneObj } from 'js/util'

export default {  
  props: {
    // 是否显示启用禁用
    isEnabled: {
      type: Boolean,
      default: false
    },
    // 是否显示管理处下拉
    isSubArea: {
      type: Boolean,
      default: false
    },
    // 是否显示村居下拉
    isiName: {
      type: Boolean,
      default: false
    },
    // 是否显示巡查员姓名
    isPatrolmanName: {
      type: Boolean,
      default: false
    },
    // 是否显示巡查员帐号
    isUserName: {
      type: Boolean,
      default: false
    },
    // 是否显示新增巡查员
    isAddPatrolMan: {
      type: Boolean,
      default: false
    },
    // 是否显示导出列表
    isExport: {
      type: Boolean,
      default: false
    }
  },
  data () { 
    return {  
      subAreaData:subAreaDatas,
      iNameData:[],
      enabledData:enabledDatas,
      unit: {
        enabled:'全部',
        subArea: '',
        iName:'',
        patrolmanName:'',
        userName:''
      }
    }  
  },
  mounted() {
    this.init()
  },
  methods: { 
    init() {  
      this._getiName()
    },
    // 搜索
    search() {
      // 处理this.unit 
      let data = cloneObj(this.unit)
      data.enabled = (this.unit.enabled === undefined || this.unit.enabled === '全部') ? '-1,0,1|#|innum' : (this.unit.enabled === '未禁用' ? '-1,1|#|innum' : '0')
      data.subArea = this.unit.subArea === undefined ? '' : this.unit.subArea
      data.iName = this.unit.iName === undefined ? '' : this.unit.iName
      data.userName = this.unit.userName !== '' ? (this.unit.userName + fuzzyQueryStr) : ''
      data.patrolmanName = this.unit.patrolmanName !== '' ? (this.unit.patrolmanName + fuzzyQueryStr) : ''

      this.$emit('search',data)
    },
    // 新增巡查员
    addPatrolman() {
      this.$emit('addPatrolman')
    },
    // 获取村居列表
    _getiName() { 
      this.unit.iName = ''
      let data = {
        ...pages,
        searchValue:{
          subArea: this.unit.subArea === undefined ? '' : this.unit.subArea
        }
      }
      getiNameList(data)
        .then(res => {
          if(res.code === ERR_OK) {
            let dataList = res.result.list  
            let arr = []
            dataList.map(dataItem => {
              arr.push({
                value:dataItem.iName,
                label:dataItem.iName
              })
            })
            this.iNameData = arr
          } else {
            this.$Notice.warning({
              title:res.message
            })
            backToLogin(res.code)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.Select { 
  padding:20px 0;
  width:100%;
  .selectLeft {
    width:80%;
  }
  .selectRight {
    width:20%;
    text-align:right;
  }
  .selectItem {
    width:140px;
  }
  .inputItem {
    width:160px;
  }
}

</style>

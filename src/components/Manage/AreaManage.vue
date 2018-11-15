<template>
  <div class="AreaManage">
    <unit-select @search="search"></unit-select>
    <div class="table">
      <Table width="100%" :columns="areaThead" :data="areaData" stripe border></Table>
      <Page class="page" :total="total" :current="current" :page-size="15" @on-change="pageChange" />
    </div>
  </div>
</template> 

<script>

import UnitSelect from 'public/UnitSelect' 
import { areaTheads } from 'js/tableThead' 
import { getiNameList } from 'api/port' 
import { pages, ERR_OK } from 'api/config' 
import { backToLogin } from 'js/util' 

export default {
  components: {
    'unit-select':UnitSelect
  },
  data () {
    return {
      total:0,
      current:1,
      areaData:[],
      areaThead:areaTheads,
      lastThead: {
        title: '操作',
        fixed: 'right',
        width: 120,
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    }
                  },
                '修改'
              )
            ])
        }
    }
    }
  },
  created() {
    this.areaThead.push(this.lastThead)
  },
  mounted() {
    this._getiNameList(1)
  },
  methods: {
    // 获取村居列表
    _getiNameList(page,searchValue) {
      let data = {
        ...pages,
        searchValue: {
          subArea:""
        }
      }

      getiNameList(data)
        .then( res => {
          if( res.code === ERR_OK ) {
            let data = res.result
            let arr = []
            data.list.map((dataItem,index) => {
              arr.push({
                index: index + 1,
                subArea: dataItem.subArea,
                iName:dataItem.iName,
                address:dataItem.address,
                phone:dataItem.phone 
              })
            })  
            this.areaData = arr
            this.total = data.total
          } else {  
            this.$Notice.warning({
              title: res.message
            })
            backToLogin(res.code)
          }
        })
    },
    // 分页
    pageChange(page) {
      this.current = page
      this._getiNameList(page)
    },
    // 搜索
    search(datas) {
      console.log(datas)
    }
  }
}
</script>

<style scoped>

</style>

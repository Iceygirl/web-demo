<template>
  <div class="PatrolmanManage">
    <!-- 搜索 -->
    <unit-select :isSubArea="true" :isiName="true" :isEnabled="true" :isPatrolmanName="true" :isUserName="true" :isAddPatrolMan="true" :isExport="true" @search="search" @addPatrolman="addPatrolman"></unit-select>

    <!-- 列表 -->
    <div class="lists">
      <Table width="100%" :columns="theads" :data="patrolManData" stripe border></Table>
      <Page class="page" :total="total" :current="current" :page-size="15" showTotal @on-change="pageChange" />
    </div>

    <!-- 弹框 -->
    <Modal class="modal" ref="modal"  v-model="showModal" :name="modalName" :title="modalTit" :width="modalWidth" @on-cancel="cancel">
      <!-- 新增巡查员 -->
      <div v-if="modalName === 'addPatrolman'"> 
        <Form class="form" ref="formAdd" :model="formAdd" :rules="rulesAdd">
          <FormItem class="formitem" prop="userName" label="账号"> 
              <Input type="text" v-model="formAdd.userName" placeholder="请输入账号">
              </Input>   
          </FormItem>  
          <FormItem class="formitem" prop="name" label="巡查员姓名"> 
              <Input type="text" v-model="formAdd.name" placeholder="请输入姓名">
              </Input>
          </FormItem>  
          <FormItem class="formitem" prop="phone" label="联系电话"> 
              <Input type="text" v-model="formAdd.phone" placeholder="请输入联系电话">
              </Input>
          </FormItem>  
          <FormItem class="formitem" prop="idCard" label="身份证号"> 
              <Input type="text" v-model="formAdd.idCard" placeholder="请输入身份证号">
              </Input>
          </FormItem>  
          <FormItem class="formitem" prop="subArea" label="所属管理处"> 
            <Select v-model="formAdd.subArea"  placeholder="请选择管理处" @on-change="_getiName">
                <Option v-for="item in subAreaData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>  
          <FormItem class="formitem" prop="iName" label="所属村居"> 
            <Select v-model="formAdd.iName"  placeholder="请选择村居/社区" :disabled="formAdd.subArea === ''">
                <Option v-for="item in iNameData" :value="item.value" :key="item.value">{{ item.label }}</Option> 
            </Select>
          </FormItem>  
        </Form>
      </div>

      <div slot="footer">
        <Button type="primary" @click="_addSave" v-if="modalName === 'addPatrolman'" :disabled="isAddSave">{{isAddSave ? '添加中...':'保存'}}</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
  
<script>  
import UnitSelect from 'public/UnitSelect' 
import { patrolmanTheads } from 'js/tableThead'
import { getPatrolmanLists, addPatrolman, getiNameList } from 'api/port'
import { pages, ERR_OK } from 'api/config'
import { subAreaDatas } from 'js/gobalDatas' 
import { backToLogin } from 'js/util'
import { rulesAddPatrolman } from 'js/formRules'

export default {
  components: {
    'unit-select': UnitSelect  
  },
  data () {
    return {
      subAreaData:subAreaDatas,
      iNameData:[],
      total:0,
      current:1,
      searchValue:{},
      patrolManData:[],
      showModal:false,
      modalName:'',
      modalTit:'',
      modalWidth:500,
      isAddSave:false,
      formAdd: {
        userName:'',
        name:'',
        phone:'',
        isCard:'',
        subArea:'',
        iName:''
      },
      rulesAdd: rulesAddPatrolman,
      theads:[{
        title: '操作',
        fixed: 'right', 
        width: 360,
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                      marginRight:'6px'
                    },
                    on: { 
                      click:() => {
                        this.addUp(params.row,params.index)
                      }
                    }
                  },
                '巡查统计'),
                h('Button', {
                    props: {
                        type: 'success',
                        size: 'small'
                    },
                    style: {
                      marginRight:'6px'
                    },
                    on: { 
                      click:() => {
                        this.allot(params.row,params.index)
                      }
                    }
                  },
                '分配场所'),
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                      marginRight:'6px'
                    },
                    on: { 
                      click:() => {
                        this.edit(params.row,params.index)
                      }
                    }
                  },
                '修改信息'),
                h('Button', {
                    props: {
                        type: 'warning',
                        size: 'small'
                    },
                    style: {
                      marginRight:'6px'
                    },
                    on: { 
                      click:() => {
                        this.resetPsw(params.row,params.index)
                      }
                    }
                  },
                '密码重置'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: { 
                      click:() => {
                        this.ableOrDisable(params.row,params.index)
                      }
                    }
                  },
                '禁用')
            ])
        }
      }]
    }
  },
  created() {
    this.getTheads()
  },
  mounted() {
    this.current = 1
    this._getPatrolmanLists(this.current)
  },
  methods: {
    // 获取列
    getTheads() {
      patrolmanTheads.map(pitem => {
        this.theads.push(pitem)
      })
    },
    // 获取巡查员列表
    _getPatrolmanLists() {
      pages.page = this.current
      let data= {
        ...pages,
        role:2,
        ...this.searchValue
      }
      getPatrolmanLists(data)
        .then(res => {
          if(res.code === ERR_OK) {
            let data = res.result
            let arr = []
            data.list.map((dataItem,index) => {
              arr.push({
                index:pages.pageSize*(this.current-1) + index + 1,
                name:dataItem.name,
                userName:dataItem.userName,
                phone:dataItem.phone,
                idCard:dataItem.idCard,
                subArea:dataItem.institution.subArea,
                iName:dataItem.institution.iName
              })
            })
            this.patrolManData = arr
            this.total = data.total
          } else {
            this.$Notice.warning({
              title:res.message
            })
            backToLogin(res.code)
          }
        })
    },
    // 打开新增巡查员弹框
    addPatrolman() {
      this.showModal = true
      this.modalName = 'addPatrolman'
      this.modalTit = '新增巡查员'
      this.modalWidth = 500
      this._getiName()
    },
    // 获取村居列表
    _getiName() { 
      let data = {
        ...pages,
        searchValue:{
          subArea: this.formAdd.subArea
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
    },
    // 新增保存
    _addSave() {
      this.isAddSave = true
      this.$refs.formAdd.validate(valid => {
        if(valid) {
          let data = {
            role:2,
            ...this.formAdd
          } 
          addPatrolman(data)
          .then(res=> { 
            if(res.code === ERR_OK) {
              this.isAddSave = false
              this.showModal = false
              this.$Message.info(res.message)
              this.current = 1
              this._getPatrolmanLists(this.current)
            } else {
              this.$Notice.warning({
                title:res.message
              })
              backToLogin(res.code)
            }
          })
        }
      })
    },
    // 打开巡查统计弹框
    addUp() {

    },
    // 打开分配场所弹框
    allot() {

    },
    // 打开修改信息弹框
    edit() {

    },
    // 打开重置密码弹框
    resetPsw() {
 
    },
    // 打开启用禁用弹框
    ableOrDisable() {

    },
    
    // 取消
    cancel() {
      this.showModal = false
      this.$refs.formAdd.resetFields()
    },
    // 搜索
    search(datas) {
      this.searchValue.status = datas.enabled
      // 管理处搜索
      if(datas.subArea) {
        this.searchValue.subArea = datas.subArea
      } else {
        delete this.searchValue.subArea
      }
      // 村居搜索
      if(datas.iName) {
        this.searchValue.iName = datas.iName
      } else {
        delete this.searchValue.iName
      }
      // 巡查员姓名搜索
      if(datas.patrolmanName) {
        this.searchValue.name = datas.patrolmanName
      } else {
        delete this.searchValue.name
      }
      // 巡查员账号搜索
      if(datas.userName) {
        this.searchValue.userName = datas.userName
      } else {
        delete this.searchValue.userName
      }
      this.current = 1
      this._getPatrolmanLists(this.current)
    },
    // 分页
    pageChange(page) {
      this.current = page
      this._getPatrolmanLists(this.current)
    }
  }
}
</script> 

<style lang="scss" scoped>

</style>

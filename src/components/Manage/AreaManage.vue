<template>
  <div class="AreaManage">
    <unit-select :isSubArea="true" @search="search"></unit-select>
    <div class="table">
      <Table width="100%" :columns="theads" :data="areaData" stripe border></Table>
      <Page class="page" :total="total" :current="current" :page-size="15" showTotal @on-change="pageChange" />
    </div> 
    <Modal class="modal" v-model="showModal" title="修改村居信息" width="600" @on-cancel="close">
      <Form class="form" ref="formEdit" :model="formEdit" :rules="rulesEdit">
        <FormItem class="formitem" label="所属管理处"> 
            <Input type="text" class="editInput" :value="formEdit.subArea" disabled>
            </Input>
        </FormItem>  
        <FormItem class="formitem" label="名称"> 
            <Input type="text" class="editInput" :value="formEdit.iName" disabled>
            </Input>
        </FormItem> 
        <FormItem class="formitem" prop="manager" label="管理员"> 
            <Input type="text" class="editInput" v-model="formEdit.manager">
            </Input>
        </FormItem>
        <FormItem class="formitem" prop="address" label="地址"> 
            <Input type="text" class="editInput" v-model="formEdit.address">
            </Input>
        </FormItem>
        <FormItem class="formitem" prop="phone" label="联系电话"> 
            <Input type="text" class="editInput" v-model="formEdit.phone">
            </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="eidtSave" :disabled="isClickEdit">{{isClickEdit ? '修改中...' : '保存' }}</Button>
        <Button @click="close">取消</Button>
      </div>
    </Modal>
  </div>
</template> 

<script>

import UnitSelect from 'public/UnitSelect' 
import { areaTheads } from 'js/tableThead' 
import { getiNameList, editiName } from 'api/port' 
import { pages, ERR_OK } from 'api/config' 
import { backToLogin, cloneObj } from 'js/util' 
import { rulesEditIname } from 'js/formRules' 
 
export default {
  components: {
    'unit-select':UnitSelect
  },
  data () {
    return { 
      total:0,
      current:1,
      areaData:[],
      showModal:false,
      isClickEdit:false,
      areaThead:areaTheads,
      searchValue: {
        subArea:""
      },
      formEdit:{
        subArea:'',
        iName:'',
        manager:'',
        address:'',
        phone:''
      },
      rulesEdit:rulesEditIname,
      theads:[{
        title: '操作',
        fixed: 'right', 
        width: 120,
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    on: {
                      click:() => {
                        this.edit(params.row)
                      }
                    }
                  },
                '修改'
              )
            ])
        }
      }] 
    }
  },
  created() {
    this.getTheads()
  },
  mounted() {
    this._getiNameList(1)
  },
  methods: {
    // 获取表头
    getTheads() {
      areaTheads.map(item => {
        this.theads.push(item)
      })
    },  
    // 获取村居列表
    _getiNameList(page) {
      pages.page = page !== undefined ? page : 1
      let data = {
        ...pages,
        searchValue: {
          subArea: this.searchValue.subArea
        }
      }

      getiNameList(data)
        .then( res => {
          if( res.code === ERR_OK ) {
            let data = res.result
            let arr = []
            data.list.map((dataItem,index) => {
              arr.push({
                index: pages.pageSize*(this.current-1) + index + 1,
                subArea: dataItem.subArea,
                iName:dataItem.iName,
                address:dataItem.address,
                phone:dataItem.phone,
                _id:dataItem._id,
                manager:dataItem.manager
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
      this.searchValue.subArea = datas.subArea !== undefined ? datas.subArea : ''
      this.current = 1
      this._getiNameList(1)
    },
    // 关闭
    close() {
      this.showModal = false 
      // 重置表单
      this.$refs.formEdit.resetFields()
    },
    // 打开修改弹框
    edit(item) {
      this.showModal = true
      this.formEdit = cloneObj(item)
    },
    // 修改保存
    eidtSave() {
      this.$refs.formEdit.validate(valid => {
        if(valid) {
          this.isClickEdit = true
          let data = {
            _id: this.formEdit._id,
            phone:this.formEdit.phone,
            manager:this.formEdit.manager,
            address:this.formEdit.address
          }
          editiName(data)
            .then(res => {
              if(res.code === ERR_OK) {
                this.isClickEdit = false
                this.showModal = false
                this.$Message.info('修改成功')
                this._getiNameList(this.current)
              } else {
                this.$Notice.warning({
                  title:res.message
                })
                backToLogin(res.code)
              }
            })
        }
      })
      
    }
  } 
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="Header clearfix">
    <h3 class="logoTitle">logo啦！</h3>
    <Dropdown class="dropDown" @on-click="showModal">
        <a class="name" href="javascript:void(0)">
            <Avatar icon="ios-person" size="small"/>
            {{user.name}}
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem v-for="(item,index) in operationLists" :key="index" :name="item">{{item}}</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Modal class="modal" v-model="isShowModal" :title="modalTit" :width="modalWidth" @on-cancel="close">
        <div slot="header">
           <p class="modalTit">{{modalTit}}</p>
        </div>
        <div class="modalMain" v-if="modalTit === '个人信息'">
          <p class="contentItem">帐号：{{user.userName}}</p>
          <p class="contentItem">所属管理处：{{user.subArea}}</p>
          <p class="contentItem">最近一次登录：{{user.loginTime}}</p>  
        </div>
        <div class="modalMain" v-if="modalTit === '修改密码'">
          <Form class="form" ref="formEditPsw" :model="formEditPsw" :rules="rulesFormEditPsw">
            <FormItem prop="userName" label="帐号">
                <Input type="text" class="editPswInput" :value="user.userName" disabled>
                </Input>
            </FormItem>
            <FormItem prop="oldPsw" label="原密码">
                <Input type="password" class="editPswInput" v-model="formEditPsw.oldPsw" placeholder="请输入原密码" @on-enter="_editPsw">
                </Input>
            </FormItem>
            <FormItem prop="newPsw" label="新密码">
                <Input type="password" class="editPswInput" v-model="formEditPsw.newPsw" placeholder="请输入6位或者以上的数字或字母" @on-enter="_editPsw">
                </Input>
            </FormItem>
            <FormItem prop="confirmPsw" label="确认密码">
                <Input type="password" class="editPswInput" v-model="formEditPsw.confirmPsw" placeholder="请输入确认密码" @on-enter="_editPsw">
                </Input>
            </FormItem>
          </Form>
        </div>
        <div class="modalMain" v-if="modalTit === '退出提示'">
          <p class="logoutTip">您确认要退出吗？</p>
        </div>
        <div slot="footer">
           <Button v-if="modalTit === '个人信息'" @click="close">关闭</Button>
           <Button type="primary" v-if="modalTit === '退出提示'" @click="_logout">确认</Button>
           <Button type="primary" v-if="modalTit === '修改密码'" @click="_editPsw">确认</Button>
           <Button v-if="modalTit === '退出提示' || modalTit === '修改密码'" @click="close">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>

import { getLocalStorage, removeLocalStorage } from 'js/dom'
import { formatSeconds, backToLogin, clearObjdata } from 'js/util'
import { logout, editPsw } from 'api/port'
import { ERR_OK } from 'api/config'
import { rulesEditPsw } from 'js/formRules'

export default {
  data () { 
    return {
      name:'管理员',
      operationLists:['个人信息','修改密码','注销'],
      isShowModal:false,
      modalWidth:200,
      modalTit:'个人信息',
      rulesFormEditPsw: rulesEditPsw,
      user:{
        name:'',
        userName:'',
        subArea:'',
        loginTime:''
      },
      formEditPsw: {
        oldPsw:'',
        newPsw:'',
        confirmPsw:''
      }
    }
  },
  mounted() {
    this.getUserInfo()
  }, 
  methods: {
    // 获取登录后用户信息
    getUserInfo() {
      this.userinfo = getLocalStorage('userinfo')
      this.user = {
        name:this.userinfo.name,
        userName:this.userinfo.userName,
        loginTime:formatSeconds(this.userinfo.newDate,true)
      }
      
      if(this.userinfo.institution.subArea) {
        this.user.subArea = this.userinfo.institution.subArea
      } else {
        this.user.subArea = '最高管理员无所属管理处'
      }

    },
    // 点击下拉项触发
    showModal(name) {
      this.isShowModal = true
      switch(name) {
        case '个人信息':
          this.modalWidth = 400
          this.modalTit = '个人信息'
          break;
        case '修改密码':
          this.modalWidth = 500
          this.modalTit = '修改密码'
          break;
        case '注销':
          this.modalWidth = 300
          this.modalTit = '退出提示'
          break;
      }

    },
    // 关闭弹框
    close() {
      this.isShowModal = false
      if(this.modalTit === '修改密码') {
        this.$refs.formEditPsw.resetFields()
      }
    },
    // 修改密码
    _editPsw() {
      this.$refs.formEditPsw.validate(valid => {
        if(valid) { 
          if(this.formEditPsw.oldPsw === this.formEditPsw.newPsw) {
            this.$Message.error('新密码和原密码不能相同')
            return;
          }
          if(this.formEditPsw.newPsw !== this.formEditPsw.confirmPsw) {
            this.$Message.error('新密码和确认密码不一致')
            return;
          }
          let data = {
            userName:this.user.userName,
            oldPW: this.formEditPsw.oldPsw,
            newPW: this.formEditPsw.newPsw
          }
          editPsw(data)
            .then(res => {
              if( res.code === ERR_OK) {
                this.isShowModal = false
                this.$Message.success(res.message + '，请重新登录')
                this.formEditPsw = clearObjdata(this.formEditPsw)
                setTimeout(() => {
                  removeLocalStorage('userinfo')
                  this.$router.push({ path: '/login' })
                }, 800);
              } else {
                this.$Notice.warning({
                  title: res.message
                })
                backToLogin(res.code)
              }
            })
        }
      })
      
    },
    // 退出登录
    _logout() {
      let data = {
        userName: this.user.userName
      }
      logout(data) 
        .then(res => {
          if( res.code === ERR_OK) {  
            removeLocalStorage('userinfo')
            this.$router.push({
              path: '/login'
            })
          } else {
            this.$Notice.warning({
              title: res.message
            }) 
            backToLogin(res.code)
          }
        }) 
    } 
  }
}
</script>

<style lang="scss">
.Header {
  padding:0 20px;
  .logoTitle {
    font-size:18px;
    font-weight:bold;
    color:#2d8cf0;
    float:left;
  }
  .dropDown {
    float:right;
  }
  .name {
    font-size:16px;
  }
  .ivu-avatar {
    background:#2d8cf0;
  }
}

.modal {
  .modalTit {
    text-align:center;
    font-size:16px;
  }
  .modalMain {
    .contentItem {
      font-size:14px;
      margin-bottom:10px;
    }
    .ivu-input-wrapper {
      width:70%;
    }
    .editPswInput.ivu-input {
      width:70%;
    }
    .ivu-form-item .ivu-form-item-label {
      width:120px !important;
    }
    .ivu-form-item-error-tip {
      left:127px;
    } 
  }
}
</style>

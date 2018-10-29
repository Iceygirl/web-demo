<template>
  <div class="Login">
    <div class="loginContain">
      <div class="loginContent">
        <h3 class="loginTitle">用户登录</h3>
        <Form class="form" ref="formLogin" :model="formLogin" :rules="rulesFormLogin">
          <FormItem prop="userName">
              <Input type="text" v-model="formLogin.userName" placeholder="请输入用户名" :maxlength="20" @on-enter="_toLogin">
                  <Icon type="ios-person-outline" slot="prepend" size="24"></Icon>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input type="password" v-model="formLogin.password" placeholder="请输入密码"  :maxlength="16" @on-enter="_toLogin">
                  <Icon type="ios-lock-outline" slot="prepend" size="24"></Icon>
              </Input>
          </FormItem>
          
          <FormItem prop="checkCode">
              <Input type="text" v-model="formLogin.checkCode" placeholder="请输入验证码" style="width:50%;" :maxlength="4" @on-enter="_toLogin"></Input>
              <img class="codeImg" :src="imgCodeUrl" alt="" @click="_getCode">
          </FormItem>
          <FormItem>
              <Button class="loginBtn" type="primary" @click="_toLogin">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>  
  </div>
</template> 

<script>

import { getCode, toLogin } from 'api/port'
import { ERR_OK } from 'api/config'
import { rulesLogin } from 'js/formRules'
import { cloneObj } from 'js/util'
import { getLocalStorage } from 'js/dom'
 
export default {
  data () { 
    return {
      formLogin: {
        userName:'',
        password:'',
        checkCode:''
      },
      rulesFormLogin:rulesLogin,
      imgCodeUrl:'',
      id:''
    }
  }, 
  mounted(){
    this._getCode()
  },
  methods: {
    // 获取验证码
    _getCode() {
      getCode()
        .then(res=> {
          if( res.code === ERR_OK) {
            let data = res.result
            this.imgCodeUrl = 'data:image/jpg;base64,' + data.imgCode 
            this.id = data.id
          } else {
              this.$Notice.warning({
                title: res.message
              })
          }
        })
    },
    // 登录
    _toLogin() {
      this.$refs.formLogin.validate(valid => {
        if(valid) {
          let data = {
            id:this.id,
            ...this.formLogin
          } 
          toLogin(data) 
            .then(res => {
                if(res.code === ERR_OK) {
                  let data = res.result
                  if(data.role === 1 ) {
                    getLocalStorage('userinfo',data)
                    this.$router.push('/home/main')
                  } else {
                    this.$Notice.warning({
                      title: '没有权限！'
                    })
                  }
                } else {
                  this.$Notice.warning({
                    title: res.message
                  })
                }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .Login {
    height:100%;
    background:#CAF2FE;
    padding-top:200px;
    .ivu-input {
      height:40px;
      font-size:14px;
    }
  }
  
  .loginContain {
    padding:50px 40px;
    width:400px;
    margin:0 auto;
    box-sizing: border-box;
    background: #fff;

    .loginContent {
      //  width:300px;
    }
    .loginTitle {
      font-size:30px;
      font-weight:bold;
      color:#32a6ff;
      text-align:center;
      margin-bottom:20px;
    }
    .form {
      .codeImg {
        width:36%;
        height:40px;
        display: inline-block;
        float:right;
        border-radius: 4px;
      }
      .loginBtn {
        width:100%;
        font-size:20px;
      }
    }
  }

  
</style>

// 表单规则

export const rulesLogin = {
  userName: [
    { 
      required: true, 
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password:[
    { 
      required: true, 
      message: '请输入密码',
      trigger: 'blur'
    } 
  ],
  checkCode: [
    { 
      required: true, 
      message: '请输入验证码',
      trigger: 'blur'
    } 
  ]
}
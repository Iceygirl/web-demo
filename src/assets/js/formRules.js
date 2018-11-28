// 表单规则

// 自定义表单验证规则

// 新密码验证

const newPswValid = (rule, value, callback) => {
  let newPswReg = /^[a-zA-Z0-9]{6,20}$/
  if (!newPswReg.test(value)) {
    callback(new Error('新密码需由6位或以上的数字或字母组成'));
    return
  }
  callback() 
}

// 登录表单规则
export const rulesLogin = {
  userName: [{ 
    required: true, 
    message: '请输入用户名',
    trigger: 'blur'
  }],
  password:[{ 
    required: true, 
    message: '请输入密码',
    trigger: 'blur'
  }],
  checkCode: [{ 
    required: true, 
    message: '请输入验证码',
    trigger: 'blur'
  }]
}

// 修改密码表单规则
export const rulesEditPsw = {
  oldPsw: [{ 
    required: true, 
    message: '请输入原密码',
    trigger: 'blur'
  }],
  newPsw:[{ 
    required: true, 
    message: '请输入新密码',
    trigger: 'blur'
  },{ 
    validator: newPswValid, 
    trigger: 'blur'
  }],
  confirmPsw: [{ 
    required: true, 
    message: '请输入确认密码',
    trigger: 'blur'
  }]
}


// 修改村居表单规则
export const rulesEditIname = {
  address:[{ 
    required: true, 
    message: '请输入地址',
    trigger: 'blur'
  }],
  phone: [{ 
    required: true, 
    message: '请输入联系电话',
    trigger: 'blur'
  }]
}

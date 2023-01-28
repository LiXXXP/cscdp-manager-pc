import { ref, reactive } from 'vue'
import md5 from 'js-md5'
import type { FormInstance } from 'element-plus'
import loginApi from '@/api/user/login'
import { getUserId } from '@/utils/auth'

/**
 * 验证再次输入密码
 */
const validatecheckPass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== passwordState.ruleForm.password) {
    callback(new Error('两次输入密码不一致，请重新输入'))
  } else {
    callback()
  }
}

export const passwordState = reactive({
  isDialog: false,
  ruleForm: {
    oldPassword: '',
    password: '',
    newPassword: ''
  },
  rules: {
    oldPassword: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
      { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '请输入6-16位的数字和字母的组合' }
    ],
    newPassword: [{ required: true, validator: validatecheckPass, trigger: 'blur' }]
  }
})

export const usePassword = () => {
  const ruleFormRef = ref<FormInstance>()

  /**
   * 修改密码
   */
  const changePassword = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        const param = {
          newPassword: md5(passwordState.ruleForm.newPassword),
          oldPassword: md5(passwordState.ruleForm.oldPassword),
          userId: getUserId()
        }
        await loginApi.changePassword(param)
        passwordState.isDialog = false
      }
    })
  }
  return {
    ruleFormRef,
    changePassword
  }
}

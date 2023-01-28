import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'
import Cookies from 'js-cookie'
import type { FormInstance } from 'element-plus'
import loginApi from '@/api/user/login'
import { setToken, setUserId } from '@/utils/auth'

export const loginState = reactive({
  ruleForm: {
    account: '',
    password: '',
    captchaCode: '',
    captchaId: ''
  },
  rules: {
    account: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '请填写正确的手机号码' }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    captchaCode: [
      { required: true, message: '请填写验证码', rigger: 'blur' },
      { pattern: /^[^\u4e00-\u9fa5 ]{0,4}$/, message: '请输入正确的验证码' }
    ]
  },
  baseUrl: ''
})

export const useLoginMethod = () => {
  const ruleFormRef = ref<FormInstance>()
  const router = useRouter()

  /**
   * 获取验证码
   */
  const captchaCodeInquiry = async () => {
    const res: any = await loginApi.captchaCodeInquiry({})
    loginState.baseUrl = `data:image/jpeg;base64,${res.body.captchaCodeBase64}`
    loginState.ruleForm.captchaId = res.body.captchaId
  }

  /**
   * 登录
   */
  const onLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        const params = {
          ...loginState.ruleForm,
          password: md5(loginState.ruleForm.password)
        }
        await loginApi
          .login(params)
          .then((res: any) => {
            setToken(res.body.accessToken)
            setUserId(res.body.userId)
            Cookies.set('realName', res.body.realName)
            router.push({ path: '/' })
          })
          .catch(() => {
            captchaCodeInquiry()
          })
      }
    })
  }

  return {
    ruleFormRef,
    captchaCodeInquiry,
    onLogin
  }
}

import type { FormRules } from 'element-plus'

export interface LoginState {
  ruleForm: RuleForm
  rules: FormRules
}

interface RuleForm {
  phone: string
  password: string
  baseUrl: string
  captchaId: string
  code: string
}

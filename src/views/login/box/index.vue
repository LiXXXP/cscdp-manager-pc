<template>
  <div class="gwin-platform-login-box">
    <div class="gwin-platform-login-header">
      <p class="gwin-platform-login-header__hello">Hello，</p>
      <p>欢迎您登录系统管理后台</p>
    </div>
    <el-form ref="ruleFormRef" :model="loginState.ruleForm" :rules="loginState.rules" status-icon>
      <el-form-item prop="account">
        <el-input
          v-model="loginState.ruleForm.account"
          class="gwin-platform-login-input"
          placeholder="请输入手机号"
          name="phone"
          type="number"
          tabindex="1"
          maxlength="11"
          auto-complete="on"
          @keyup.enter="onLogin(ruleFormRef)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginState.ruleForm.password"
          class="gwin-platform-login-input"
          placeholder="请输入密码"
          type="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter="onLogin(ruleFormRef)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captchaCode">
        <el-input
          ref="security"
          v-model="loginState.ruleForm.captchaCode"
          class="gwin-platform-login-input"
          placeholder="请输入验证码"
          name="security"
          type="text"
          @keyup.enter="onLogin(ruleFormRef)"
        ></el-input>
        <img :src="loginState.baseUrl" class="gwin-platform-captcha-code" @click="captchaCodeInquiry" />
      </el-form-item>
      <el-form-item>
        <el-button class="gwin-platform-login-btn" @click="onLogin(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { loginState, useLoginMethod } from './login'
const { ruleFormRef, captchaCodeInquiry, onLogin } = useLoginMethod()

onMounted(() => {
  captchaCodeInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('login-box') {
  width: 400px;
  padding: 40px;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 10px 100px 0px rgba(170, 170, 170, 0.3);
}
@include b('login-header') {
  color: #333;
  font-size: 14px;
  margin-bottom: 30px;
  @include e('hello') {
    font-size: 32px;
    color: #121212;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
@include b('login-input') {
  width: 100%;
  height: 48px;
  font-size: 14px;
  :deep(.el-input__wrapper) {
    border-radius: 25px;
    &.is-focus {
      box-shadow: 0 0 0 1px #e62d28 inset;
    }
  }
}
@include b('captcha-code') {
  height: 48px;
  cursor: pointer;
  border-radius: 0 25px 25px 0;
  position: absolute;
  top: 0;
  right: 0;
}
@include b('login-btn') {
  border: 0;
  width: 100%;
  height: 48px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  letter-spacing: 2px;
  border-radius: 24px;
  background: #e62d28;
}
</style>

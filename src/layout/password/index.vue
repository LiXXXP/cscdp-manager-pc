<template>
  <el-dialog v-model="passwordState.isDialog" width="30%">
    <div class="gwin-platform-password">
      <div class="gwin-platform-password__title">修改密码</div>
      <el-form ref="ruleFormRef" :model="passwordState.ruleForm" :rules="passwordState.rules" status-icon>
        <el-form-item prop="oldPassword">
          <el-input
            v-model="passwordState.ruleForm.oldPassword"
            class="gwin-platform-password-input"
            placeholder="请输入原始密码"
            type="password"
            tabindex="2"
            auto-complete="on"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="passwordState.ruleForm.password"
            class="gwin-platform-password-input"
            placeholder="请输入新密码"
            type="password"
            tabindex="2"
            auto-complete="on"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            v-model="passwordState.ruleForm.newPassword"
            class="gwin-platform-password-input"
            placeholder="请确认新密码"
            type="password"
            tabindex="2"
            auto-complete="on"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="gwin-platform-password-btn" @click="changePassword(ruleFormRef)">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { passwordState, usePassword } from './password'
const { ruleFormRef, changePassword } = usePassword()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('password') {
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  @include e('title') {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: center;
  }
}
@include b('password-input') {
  width: 100%;
  height: 48px;
  font-size: 14px;
  margin-bottom: 5px;
  :deep(.el-input__wrapper) {
    &.is-focus {
      box-shadow: 0 0 0 1px #e62d28 inset;
    }
  }
}
@include b('password-btn') {
  border: 0;
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  border-radius: 24px;
  color: #fff !important;
  background: #e62d28 !important;
}
</style>

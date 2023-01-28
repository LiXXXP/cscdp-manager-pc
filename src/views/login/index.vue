<template>
  <div class="gwin-platform-login">
    <div class="gwin-platform-logo">
      <img src="@/assets/img/login/logo.png" />
      <p>民政智慧云管理后台</p>
    </div>
    <div class="gwin-platform-login-cont">
      <img src="@/assets/img/login/login-text.png" class="gwin-platform-login-text" />
      <div>
        <LoginBox></LoginBox>
        <p>基于 <span>民政智慧云数字平台</span> 提供服务</p>
      </div>
    </div>
    <div class="gwin-platform-footer">
      <p>互联网出版许可证新出网证(京)字135号 京ICP备19052864号 <i></i> 京公网安备 11010502045853号</p>
      <p>Copyright © 2001-2020 China Philanthropy Times All Rights Reserved</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginBox from '@/views/login/box/index.vue'
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('login') {
  width: 100vw;
  height: 100vh;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
@include b('logo') {
  width: 100%;
  display: flex;
  color: #1a2234;
  font-size: 20px;
  font-weight: 600;
  align-items: center;
  img {
    width: 66px;
    height: 24px;
    margin-right: 10px;
  }
}
@include b('login-cont') {
  display: flex;
  align-items: center;
  p {
    color: #333;
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
    span {
      font-weight: 600;
    }
  }
}
@include b('login-text') {
  width: 304px;
  height: 65px;
  margin-right: 160px;
}
@include b('footer') {
  p {
    color: #606a78;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
  }
  i {
    width: 16px;
    height: 18px;
    margin: 0 5px;
    display: inline-block;
    vertical-align: text-bottom;
    background: url('@/assets/img/login/copyright.png') no-repeat 0 0;
    background-size: 100%;
  }
}
</style>

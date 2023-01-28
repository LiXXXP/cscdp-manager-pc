<template>
  <div>
    <div class="gwin-platform-header">
      <el-card class="gwin-platform-header-card">
        <p class="header-title">汇总统计</p>
        <div class="gwin-platform-header-card__item">
          <p>{{ statisticsObj.totalNews }}</p>
          <p>总内容数</p>
        </div>
        <div class="gwin-platform-header-card__item right">
          <p>{{ statisticsObj.totalText }}</p>
          <p>总图文数</p>
        </div>
        <div class="gwin-platform-header-card__item right">
          <p>{{ statisticsObj.totalVideo }}</p>
          <p>总视频数</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { headerState } from './header'
const { statisticsObj } = headerState()
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('header') {
  width: 100%;
  height: 200px;
}
@include b('header-card') {
  width: 100%;
  height: 100%;
  .right {
    margin-left: 200px;
  }
}

@include e('item') {
  display: inline-block;
  text-align: center;
  margin: 30px 80px 0;
  p:nth-of-type(1) {
    font-size: 24px;
    font-weight: 900;
  }
  p:nth-of-type(2) {
    font-size: 12px;
    margin-top: 10px;
  }
}
.header-title {
  margin: 20px;
  font-weight: bold;
}
</style>

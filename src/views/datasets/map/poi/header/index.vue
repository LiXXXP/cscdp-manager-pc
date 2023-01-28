<template>
  <div class="gwin-platform-header">
    <el-card class="gwin-platform-header-card">
      <div>
        <p class="header-title">汇总统计</p>
        <el-cascader :options="options" :props="props" :show-all-levels="false" clearable @change="cityChange" />
      </div>

      <div class="gwin-platform-header-card__item">
        <p>{{ totalObj.total }}</p>
        <p>总POI点数</p>
      </div>
      <div class="gwin-platform-header-card__item right">
        <p>{{ totalObj.donate }}</p>
        <p>捐助点数</p>
      </div>
      <div class="gwin-platform-header-card__item right">
        <p>{{ totalObj.aed }}</p>
        <p>AED点数</p>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { headerState } from './header'
const props = {
  checkStrictly: true
}
const { options, totalObj, cityChange } = headerState()
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
    font-weight: 600;
  }
  p:nth-of-type(2) {
    font-size: 12px;
    margin-top: 10px;
  }
}
.header-title {
  margin: 20px;
  font-weight: bold;
  display: inline-block;
}
</style>

<template>
  <div class="gwin-platform-browse">
    <div class="gwin-platform-browse__title">新增内容浏览增长趋势</div>
    <div ref="myChart" class="gwin-platform-echarts"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useBrowseMethod } from './browse'
const { myChart, initECharts } = useBrowseMethod()

onMounted(() => {
  setTimeout(() => {
    initECharts()
  }, 300)
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('browse') {
  width: 100%;
  height: 235px;
  padding: 10px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: rgba(4, 7, 17, 0.8);
  @include e('title') {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    color: #00ffff;
    text-align: center;
    background: linear-gradient(90deg, rgba(216, 216, 216, 0), rgba(1, 68, 133, 0.19), rgba(216, 216, 216, 0));
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin-top: 10px;
      background: linear-gradient(163deg, rgba(255, 255, 255, 0), #29abe2, rgba(255, 255, 255, 0));
    }
  }
}
@include b('echarts') {
  width: 90%;
  height: 80%;
  margin: 10px auto 0;
}
</style>

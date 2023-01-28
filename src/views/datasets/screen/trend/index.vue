<template>
  <div class="gwin-platform-trend">
    <div class="gwin-platform-trend__title">近7天增长趋势</div>
    <User></User>
    <Browse></Browse>
    <Poi></Poi>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import User from '@/views/datasets/screen/trend/user/index.vue'
import Browse from '@/views/datasets/screen/trend/browse/index.vue'
import Poi from '@/views/datasets/screen/trend/poi/index.vue'
import { useTrendMethod } from './trend'
const { getWeekTrendListInquiry } = useTrendMethod()

onMounted(() => {
  getWeekTrendListInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('trend') {
  width: 280px;
  z-index: 999;
  position: absolute;
  right: 40px;
  top: 100px;
  @include e('title') {
    width: 100%;
    font-size: 20px;
    color: #00ffff;
    font-weight: 500;
    text-align: center;
    padding: 10px 20px;
    border-radius: 16px;
    box-sizing: border-box;
    border: 1px solid #00ffff;
    background-color: rgba(4, 7, 17, 0.7);
  }
}
</style>

<template>
  <div class="gwin-platform-newly">
    <div class="gwin-platform-newly__title">今日新增数据</div>
    <div class="gwin-platform-newly__content">
      <div v-for="item in newlyState.newlyList" :key="item.name">
        <p>{{ item.name }}</p>
        <p class="gwin-platform-newly__content--color">{{ item.data }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { newlyState, useNewlyMethod } from './newly'
const { getSummaryInquiry } = useNewlyMethod()
onMounted(() => {
  getSummaryInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('newly') {
  width: 100%;
  margin-top: 15px;
  font-size: 14px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: rgba(4, 7, 17, 0.8);
  @include e('title') {
    width: 100%;
    padding: 10px 0;
    font-size: 22px;
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
  @include e('content') {
    color: #fff;
    display: flex;
    font-weight: 500;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 30px 00px;
    justify-content: space-between;
    @include m('color') {
      font-size: 34px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #00ffae !important;
    }
  }
}
</style>

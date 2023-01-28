<template>
  <div class="gwin-platform-feedback">
    <div class="gwin-platform-feedback__title">反馈问题</div>
    <div class="gwin-platform-feedback__content">
      <div>
        <p>待处理</p>
        <p class="gwin-platform-feedback__content--blue">{{ feedbackState.noProcessing }}</p>
      </div>
      <div>
        <p>已处理</p>
        <p class="gwin-platform-feedback__content--green">{{ feedbackState.processed }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { feedbackState, useFeedbackMethod } from './feedback'
const { getFeedbackSummaryInquiry } = useFeedbackMethod()
onMounted(() => {
  getFeedbackSummaryInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('feedback') {
  width: 100%;
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
    align-items: center;
    box-sizing: border-box;
    padding: 10px 30px 10px;
    justify-content: space-between;
    @include m('blue') {
      color: #007bff;
      font-size: 34px;
      font-weight: 600;
    }
    @include m('green') {
      color: #3aef4b;
      font-size: 34px;
      font-weight: 600;
    }
  }
}
</style>

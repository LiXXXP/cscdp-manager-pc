<template>
  <div class="gwin-platform-sheet">
    <div class="gwin-platform-sheet__title">总览</div>
    <div class="gwin-platform-sheet-table">
      <div class="gwin-platform-sheet-table__header">
        <p>名称</p>
        <p>统计</p>
      </div>
      <div v-for="item in sheetState.tableData" :key="item.name" class="gwin-platform-sheet-table__row">
        <p>{{ item.name }}</p>
        <p>{{ item.data }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { sheetState, useSheetMethod } from './sheet'
const { getOverviewInquiry } = useSheetMethod()

onMounted(() => {
  getOverviewInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('sheet') {
  width: 100%;
  margin: 15px 0;
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
}
@include b('sheet-table') {
  font-weight: 500;
  padding: 0 20px 20px;
  box-sizing: border-box;
  @include e('header') {
    display: flex;
    color: #00ffff;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 255, 255, 0.1);
    p {
      width: 50%;
      text-align: center;
    }
  }
  @include e('row') {
    display: flex;
    color: #00ffff;
    padding-top: 12px;
    align-items: center;
    p {
      width: 50%;
      text-align: center;
      &:first-child {
        color: #fff;
        text-align: left;
      }
    }
  }
}
</style>

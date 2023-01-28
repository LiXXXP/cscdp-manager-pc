<template>
  <div class="gwin-platform-pie-box flex flex-between">
    <div class="gwin-platform-pie-box__item">
      <el-card class="box-card">
        <ECharts
          v-if="Object.keys(contentPieData.option).length"
          :height="'200px'"
          :option="contentPieData.option"
        ></ECharts>
      </el-card>
    </div>
    <div class="gwin-platform-pie-box__item">
      <el-card class="box-card">
        <ECharts v-if="Object.keys(partPieData.option).length" :height="'200px'" :option="partPieData.option"></ECharts>
      </el-card>
    </div>
    <div class="gwin-platform-pie-box__item">
      <el-card class="box-card">
        <p class="gwin-platform-title">内容数据</p>
        <div class="gwin-platform-right-data flex flex-wrap">
          <div class="gwin-platform-right-data__item">
            <p>{{ contentCountObj.todayBrowseCount }}</p>
            <p>今日浏览次数</p>
          </div>
          <div class="gwin-platform-right-data__item">
            <p>{{ contentCountObj.todayBrowseUser }}</p>
            <p>今日浏览人数</p>
          </div>
          <div class="gwin-platform-right-data__item">
            <p>{{ contentCountObj.totalBrowseCount }}</p>
            <p>总浏览次数</p>
          </div>
          <div class="gwin-platform-right-data__item">
            <p>{{ contentCountObj.totalBrowseUser }}</p>
            <p>总浏览人数</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import ECharts from '@/components/ECharts/index.vue'
import { pieChartState } from './pie'
const { contentCountObj, contentPieData, partPieData } = pieChartState()
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.box-card {
  padding: 20px;
  box-sizing: border-box;
}
@include b('pie-box') {
  margin: 20px 0;
}
@include e('item') {
  width: 32%;
}
@include b('title') {
  font-weight: 600;
}
@include b('right-data') {
  width: 100%;
}
@include e('item') {
  width: 50%;
  height: 88px;
  text-align: center;
  p:nth-of-type(1) {
    padding-top: 20px;
    font-size: 24px;
    font-weight: 900;
  }
  p:nth-of-type(2) {
    color: #999;
    font-size: 12px;
  }
}
</style>

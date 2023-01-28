<template>
  <div class="gwin-platform-home">
    <div class="gwin-platform-home__total">
      <el-card class="gwin-platform-total-left">
        <div class="gwin-platform-home__title">汇总统计</div>
        <div class="gwin-platform-total-left__list">
          <div v-for="item in homeState.collectData" :key="item.title" class="gwin-platform-total-left__item">
            <i></i>
            <div>
              <p>{{ item.title }}</p>
              <p>{{ item.today }}</p>
              <p>{{ item.sum }}</p>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="gwin-platform-total-right">
        <div class="gwin-platform-home__title">待办任务</div>
        <div class="gwin-platform-total-right__cont">暂无待办任务</div>
      </el-card>
    </div>
    <el-card class="gwin-platform-charts">
      <ECharts v-if="Object.keys(homeState.option).length" :height="'400px'" :option="homeState.option"></ECharts>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { homeState, useHomeMethod } from './home'
import ECharts from '@/components/ECharts/index.vue'
const { getHomeSummaryInquiry, getHomeTrendListInquiry } = useHomeMethod()

onMounted(() => {
  Promise.all([getHomeSummaryInquiry(), getHomeTrendListInquiry()])
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('home') {
  @include e('total') {
    height: 155px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @include e('title') {
    font-weight: 600;
    margin-bottom: 10px;
  }
}
@include b('total-left') {
  width: 69%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  @include e('list') {
    display: flex;
    justify-content: space-around;
  }
  @include e('item') {
    display: flex;
    font-size: 14px;
    align-items: center;
    i {
      width: 80px;
      height: 80px;
      margin-right: 10px;
    }
    p:nth-child(1) {
      font-size: 16px;
      font-weight: 500;
    }
    &:nth-child(1) {
      i {
        background: url('@/assets/img/home/user.png') no-repeat 0 0;
        background-size: 100%;
      }
    }
    &:nth-child(2) {
      i {
        background: url('@/assets/img/home/content.png') no-repeat 0 0;
        background-size: 100%;
      }
    }
    &:nth-child(3) {
      i {
        background: url('@/assets/img/home/poi.png') no-repeat 0 0;
        background-size: 100%;
      }
    }
  }
}
@include b('total-right') {
  width: 30%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  @include e('cont') {
    color: #888;
    font-size: 14px;
    padding-top: 20px;
    text-align: center;
  }
}
@include b('charts') {
  width: 100%;
  height: 400px;
  padding: 20px;
  margin-top: 20px;
  background: #fff;
  box-sizing: border-box;
}
</style>

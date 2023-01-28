<template>
  <div>
    <el-card v-if="route.path?.includes('/all')" class="gwin-platform-charts"><Select></Select></el-card>
    <div class="gwin-platform-header">
      <el-card class="gwin-platform-header-card">
        <p class="header-title">汇总统计</p>
        <div class="gwin-platform-header-card__item">
          <p>{{ userState.totalObj.totalUser }}</p>
          <p>总个人用户数（人）</p>
        </div>
        <div class="gwin-platform-header-card__item right">
          <p>{{ userState.totalObj.totalEnterprise }}</p>
          <p>总企业数</p>
        </div>
      </el-card>
    </div>
    <SearchForm @date-change="dateChange" @year-month-change="yearMonthChange" />
    <el-card class="gwin-platform-charts">
      <ECharts v-if="Object.keys(userState.option).length" :height="'400px'" :option="userState.option" />
    </el-card>
    <el-card class="gwin-platform-table-card">
      <p class="header-title">用户增长列表</p>
      <div class="gwin-platform-table">
        <el-table :data="userState.tableData" max-height="400" stripe>
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="totalUser" label="当前个人用户"> </el-table-column>
          <el-table-column prop="addedUser" label="新增个人用户"> </el-table-column>
          <el-table-column prop="activeUser" label="日活个人用户"> </el-table-column>
          <el-table-column prop="totalEnterprise" label="总企业数"> </el-table-column>
          <el-table-column prop="addedEnterPrise" label="新增企业数"> </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SearchForm from '@/components/seachForm/index.vue'
import ECharts from '@/components/ECharts/index.vue'
import Select from '@/components/Select/index.vue'
import { userState, useUserMethod } from './user'

const route = useRoute()

const { getUserSummaryInquiry, getUserTrendListInquiry, dateChange, yearMonthChange } = useUserMethod()

onMounted(() => {
  Promise.all([getUserSummaryInquiry(), getUserTrendListInquiry()])
})
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
}
@include b('table') {
  width: 100%;
  padding: 10px 20px;
}
@include b('charts') {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
}
</style>

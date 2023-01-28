<template>
  <div>
    <el-card v-if="route.path?.includes('/all')" class="gwin-platform-charts"><Select></Select></el-card>
    <headerCard></headerCard>
    <SearchForm @date-change="dateChange" @year-month-change="yearMonthChange" />
    <div class="gwin-platform-charts">
      <ECharts
        v-if="Object.keys(chartsDataObj.option).length"
        :option="chartsDataObj.option"
        :height="'400px'"
      ></ECharts>
    </div>
    <div class="gwin-platform-charts">
      <ECharts v-if="Object.keys(poichartsObj.option).length" :option="poichartsObj.option" :height="'400px'"></ECharts>
    </div>
    <el-card class="gwin-platform-table-card">
      <table-card></table-card>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import headerCard from './header/index.vue'
import SearchForm from '@/components/seachForm/index.vue'
import ECharts from '@/components/ECharts/index.vue'
import Select from '@/components/Select/index.vue'
import tableCard from './table/index.vue'
import { poiState } from './poi'

const route = useRoute()
const { chartsDataObj, poichartsObj, dateChange, yearMonthChange } = poiState()
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b('table') {
  width: 100%;
  max-height: 400px;
  margin: 10px 20px;
}
@include b('charts') {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background-color: #fff;
}
</style>

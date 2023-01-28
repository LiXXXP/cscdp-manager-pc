<template>
  <div>
    <el-card v-if="route.path?.includes('/all')" class="gwin-platform-charts"><Select></Select></el-card>
    <headerCard />
    <pieCharts />
    <SearchForm @date-change="dateChange" @year-month-change="yearMonthChange" />
    <div class="gwin-platform-charts">
      <ECharts
        v-if="Object.keys(contentState.newsOption).length"
        :option="contentState.newsOption"
        :height="'400px'"
      ></ECharts>
    </div>
    <div class="gwin-platform-charts">
      <ECharts
        v-if="Object.keys(contentState.browseOption).length"
        :option="contentState.browseOption"
        :height="'400px'"
      ></ECharts>
    </div>
    <tableCard />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import headerCard from './header/index.vue'
import SearchForm from '@/components/seachForm/index.vue'
import ECharts from '@/components/ECharts/index.vue'
import Select from '@/components/Select/index.vue'
import tableCard from './table/index.vue'
import pieCharts from './pie/index.vue'

import { contentState, useContentMethod } from './content'

const route = useRoute()
const {
  dateChange,
  yearMonthChange,
  limitTableInfo,
  personTableInfo,
  getNewsBrowseListInquiry,
  getNewsTrendListInquiry
} = useContentMethod()

onMounted(() => {
  Promise.all([limitTableInfo(), personTableInfo(), getNewsTrendListInquiry(), getNewsBrowseListInquiry()])
})
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('charts') {
  margin: 20px 0;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
}
</style>

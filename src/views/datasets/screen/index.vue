<template>
  <div ref="screenRef" class="gwin-platform-screen">
    <Header :screen-ref="screenRef"></Header>
    <Map></Map>
    <Overview v-show="isFull"></Overview>
    <Trend v-show="isFull"></Trend>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { isFull } from '@/views/datasets/screen/full/full'
import Map from '@/views/datasets/screen/map/index.vue'
import Header from '@/views/datasets/screen/header/index.vue'
import Overview from '@/views/datasets/screen/overview/index.vue'
import Trend from '@/views/datasets/screen/trend/index.vue'

const screenRef = ref()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('screen') {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: url('@/assets/img/map/bg.png') no-repeat 0 0;
  background-size: 100% 100%;
  position: relative;
}
</style>

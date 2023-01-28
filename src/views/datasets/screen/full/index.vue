<template>
  <i class="gwin-platform-screen__full" @click="onFullMap"></i>
</template>

<script lang="ts" setup>
import { useFullMethod } from './full'
const { onFullMap } = useFullMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('screen') {
  @include e('full') {
    width: 30px;
    height: 30px;
    z-index: 999;
    display: block;
    cursor: pointer;
    margin-right: 20px;
    border-radius: 8px;
    border: 1px solid #00ffff;
    background: url('@/assets/img/map/full.png') no-repeat 50% 50%;
    background-size: 100%;
  }
}
</style>

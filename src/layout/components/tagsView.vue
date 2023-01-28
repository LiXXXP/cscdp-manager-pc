<template>
  <div class="gwin-platform-tags">
    <div v-for="(tag, index) in tags" :key="index" class="gwin-platform-tags-item">
      <span :class="route.path == tag.router ? 'gwin-platform-tags-isSelect' : ''" @click="router.push(tag.router)">
        {{ tag.title
        }}<svg-icon class-name="icon" icon-class="gwin-delete-highlight" @click.stop="delTag(index)"></svg-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Tag } from '@/router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const tags = computed(() => store.state.system.tags)

// 删除标签
const delTag = (index: number) => {
  if (tags.value) {
    tags.value.splice(index, 1)
    store.commit('system/ADD_TAGS', tags.value)
    localStorage.setItem('tagsView', JSON.stringify(tags.value))
    if (tags.value.length > 0) {
      const tag: Tag = tags.value[tags.value.length - 1]
      router.push(tag.fullPath)
    } else {
      // tag内容为空，如果当前关闭的为dashboard，push并不会走router路由守卫, 需要重新添加dashboard
      const tag: Tag = {
        icon: 'dashboard',
        router: '/home',
        title: '首页',
        fullPath: '/home'
      }
      tags.value.push(tag)
      store.commit('system/ADD_TAGS', tags.value)
      localStorage.setItem('tagsView', JSON.stringify(tags.value))
      router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b('tags') {
  display: flex;
  padding: 0 20px;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.1);
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
}
@include b('tags-item') {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  height: 38px;
  padding: 0 20px;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
  transition: all 0.5s;
  box-sizing: border-box;
  flex-shrink: 0;
  cursor: pointer;
  svg {
    margin-left: 5px;
    font-size: 12px;
    display: none;
  }
  &:hover {
    color: #3c7dff;
    transform: scale(1.1);
    svg {
      display: inline-block;
    }
  }
}
@include b('tags-isSelect') {
  color: #3c7dff;
  border-bottom: 3px solid #3c7dff;
  padding: 0 5px;
  svg {
    display: inline-block;
  }
}
</style>

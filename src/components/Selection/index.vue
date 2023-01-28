<template>
  <div class="select-bar flex flex-between">
    <p>已选择 {{ props.selectNum }} 项</p>
    <p class="cancel" @click="handleDeselect">取消选择</p>
  </div>
  <div class="select-footer" :style="{ width: 'calc(100% - ' + data.leftWidth + 'px)' }">
    <div class="flex flex-between">
      <div>
        已选择 <span>{{ props.selectNum }}</span> 项 总计 {{ props.totalNum }} 项
      </div>
      <div class="flex flex-only-center">
        <el-button
          v-for="item in props.handleButton"
          :key="item.text"
          class="btn-font-normal"
          :type="item.type"
          size="small"
          @click="handleBatch(item.interpret)"
          >{{ item.text }}</el-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { PropType } from 'vue'

interface buttonsProps {
  text: string
  type: string
  interpret: string
}

// eslint-disable-next-line no-undef
const props = defineProps({
  selectNum: {
    type: Number,
    default: 0
  },
  totalNum: {
    type: Number,
    default: 0
  },
  handleButton: {
    type: Array as PropType<buttonsProps[]>,
    default: () => []
  }
})

const store = useStore()

const data = reactive({
  leftWidth: 0
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['handleDeselection', 'handleBatchBtn'])

watchEffect(() => {
  data.leftWidth = store.state.app.sidebar.opened ? 210 : 54
})

const handleDeselect = () => {
  emit('handleDeselection', [])
}

const handleBatch = (interpret: string) => {
  emit('handleBatchBtn', interpret)
}
</script>

<style lang="scss" scoped>
.select-bar {
  width: 100%;
  margin: 16px 0;
  font-size: 14px;
  padding: 12px 24px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  .cancel {
    color: #1890ff;
    cursor: pointer;
  }
}
.select-footer {
  padding: 0 24px;
  font-size: 14px;
  line-height: 44px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -6px 16px -8px rgb(0 0 0 / 8%), 0 -9px 28px 0 rgb(0 0 0 / 5%), 0 -12px 48px 16px rgb(0 0 0 / 3%);
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  span {
    color: #1890ff;
  }
}
</style>

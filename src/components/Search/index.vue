<template>
  <el-form class="form" label-position="right">
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in state.formList"
        :key="index"
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 12, offset: 0 }"
        :lg="{ span: 8, offset: 0 }"
        :xl="{ span: 6, offset: 0 }"
        :class="item.show ? 'search-show' : 'search-hide'"
      >
        <el-form-item :label="item.lable" label-width="120px" class="form-item-defined">
          <label v-if="item.tips" slot="{label}" class="tips-icon"> </label>
          <el-input
            v-if="item.type === 'input'"
            v-model="item.value"
            :placeholder="item.placeholder"
            :size="item.size"
            style="width: 100%"
            autocomplete="off"
          />
          <el-select
            v-if="item.type === 'select'"
            v-model="item.value"
            :placeholder="item.placeholder"
            :size="item.size"
            style="width: 100%"
          >
            <el-option v-for="o in item.option" :key="o.value" :label="o.label" :value="o.value"></el-option>
          </el-select>

          <el-date-picker
            v-if="item.type === 'picker'"
            v-model="item.value"
            :size="item.size"
            :type="item.timeType"
            :placeholder="item.placeholder"
            style="width: 100%"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 12, offset: getOffset(2) }"
        :lg="{ span: 8, offset: getOffset(3) }"
        :xl="{ span: 6, offset: getOffset(4) }"
      >
        <div v-if="state.operation" class="handle-btn flex flex-end flex-only-center">
          <el-button size="small" class="btn-font-normal" @click="handleResetClick">重置</el-button>
          <el-button type="primary" size="small" class="btn-font-normal" @click="handleSearchClick">查询</el-button>
          <el-button type="text" class="btn-font-normal" @click="handleFoldUnfold">{{ state.switch }}</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, PropType, onMounted, watchEffect } from 'vue'

/**
 * 搜索操作区域属性定义
 */
export interface SearchFormProps {
  type?: string
  lable: string
  placeholder: string
  value: string
  size?: string
  tips?: string
  show?: boolean
  option?: any
}

const props = defineProps({
  searchForm: {
    type: Array as PropType<SearchFormProps[]>,
    default: () => [],
    required: true
  },
  seachOperation: {
    type: Boolean,
    dafault: () => true,
    required: true
  }
})

const emit = defineEmits(['handleSearchClick', 'resetSearchClick'])

const state = reactive({
  formList: props.searchForm,
  switch: '展开',
  iconClass: 'unfold',
  numberOfColumn: 0,
  operation: props.seachOperation
})
/**
 * 当前页宽显示几列
 * 总共有多少个表单
 * 收缩状态下显示几列
 * 展开状态下显示
 */
onMounted(() => {
  // 执行一次计算出当前屏幕能够显示的列数
  getNumberOfColumn()

  // 根据当前屏幕能够显示的列数，在收起的状态下，把其它表单隐藏起来
  handleColumnDisplayStatus(false)

  // 当屏幕宽度发生变化的时候计算变化后屏幕能够显示的列数
  window.onresize = getNumberOfColumn
})

/*
 * 根据屏幕宽度实时计算能够显示的列数
 */
const getNumberOfColumn = () => {
  const width = document.documentElement.clientWidth

  // xs < 768, sm ≥ 768px, ms ≥ 992px, lg ≥ 1200px, xl ≥ 1920px
  // width < 768
  //   ? (state.numberOfColumn = 1)
  //   : width >= 768 && width < 1200
  //   ? (state.numberOfColumn = 2)
  // width >= 1200 && width < 1920 ? state.numberOfColumn = 3 : state.numberOfColumn = 4
}

const handleColumnDisplayStatus = (unfold = false) => {
  if (unfold) {
    for (const item of state.formList) {
      item.show = true
      console.log(item.value)
    }
  } else {
    for (const i in state.formList) {
      const index = parseInt(i)
      index < state.numberOfColumn - 1 || index === 0
        ? (state.formList[index].show = true)
        : (state.formList[index].show = false)
    }
  }
}

/**
 * 当numberOfColumn发生变化的时候执行
 */
watchEffect(() => {
  handleColumnDisplayStatus()
})

/**
 * 展开或者收起
 */
const handleFoldUnfold = () => {
  if (state.switch === '展开') {
    state.switch = '收起'
    handleColumnDisplayStatus(true)
  } else {
    state.switch = '展开'
    handleColumnDisplayStatus(false)
  }
}

/**
 * 根据列数量，获取不同屏幕下时，搜索按钮的offset
 */
const getOffset = (availableColumns: number) => {
  const visiableFormLength: number = state.formList.filter((form) => form.show).length
  switch (availableColumns) {
  case 2:
    return visiableFormLength % availableColumns === 1 ? 0 : 12
  case 3:
    return visiableFormLength % availableColumns === 1 ? 8 : visiableFormLength % availableColumns === 2 ? 0 : 16
  case 4:
    return visiableFormLength % availableColumns === 1
      ? 12
      : visiableFormLength % availableColumns === 2
          ? 6
          : visiableFormLength % availableColumns === 3
            ? 0
            : 18
  default:
    return 0
  }
}

/**
 * 将所有表单数据清空
 */
const handleResetClick = () => {
  state.formList.forEach((v) => (v.value = ''))
  emit('resetSearchClick')
}

/**
 * 点击查询按钮，将表单数据传至父组件
 */
const handleSearchClick = () => {
  emit('handleSearchClick', state.formList)
}
</script>
<style lang="scss" scoped>
.form {
  padding: 20px;
  box-sizing: border-box;
}
.form-item-defined,
.handle-btn {
  margin: 10px 0;
}

.mark {
  cursor: help;
}
.form-item-defined {
  position: relative;
  .tips-icon {
    position: absolute;
    top: 0;
    left: -20px;
  }
}
.search-hide {
  display: none;
}
.search-show {
  display: block;
}
:deep(.el-form-item__label) {
  padding-right: 22px;
}
</style>

<template>
  <div class="search">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="form-inline">
        <el-form-item>
          <el-select v-model="formInline.date" clearable :disabled="disabled" @change="dateChange">
            <el-option v-for="(item, index) in dateList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="formInline.month"
            type="month"
            format="YYYY/MM"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="yearMonthChange"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, defineEmits } from 'vue'
import { formatDate, getDate, getDateByMonth } from '@/utils/index'
interface form {
  date: string | number
  formDataTime: any[]
  month: string
}
const formInline = reactive<form>({
  date: 2,
  month: '',
  formDataTime: [] // 时间范围选择
})
// const pickerOptions
const dateList = reactive([
  {
    label: '昨天',
    value: 1
  },
  {
    label: '最近7天',
    value: 2
  },
  {
    label: '最近30天',
    value: 3
  }
])

const disabled = ref(false)
const emit = defineEmits(['dateChange', 'yearMonthChange'])

const dateChange = (val: number) => {
  let day = 1
  if (val === 1) day = 1
  if (val === 2) day = 7
  if (val === 3) day = 30
  formInline.formDataTime = [getDate(day) + ' 00:00:00', formatDate(new Date().getTime(), 'h:m:s')]
  emit('dateChange', formInline.formDataTime)
}
// 年月日监听 （选中值后禁用第一个下拉框）
const yearMonthChange = (e: string | number) => {
  if (e) {
    disabled.value = true
  } else {
    disabled.value = false
  }
  const end = getDateByMonth(new Date(formInline.month))
  formInline.formDataTime = [formInline.month + ' 00:00:00', end + ' 00:00:00']
  formInline.month && emit('yearMonthChange', formInline.formDataTime)
}
</script>

<style lang="scss" scoped>
.search {
  margin-top: 20px;
}
.form-inline {
  margin: 30px 0 10px 20px;
}
</style>

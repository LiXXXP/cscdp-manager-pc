import { RouteRecordRaw } from 'vue-router'

// 联合类型
type RouteConfig = RouteRecordRaw & {
  hidden?: boolean
  children?: RouteConfig[]
  meta?: { title: string; icon?: string; activeMenu?: boolean }
} // hidden 是可选属性

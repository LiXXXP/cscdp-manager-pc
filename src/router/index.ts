import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import appRoutes from './app.router'
import applicationRoutes from './application.router'
import datasetsRoutes from './datasets.router'
import commonRoutes from './common.router'
import systemRouter from './system.router'
import getPageTitle from '../utils/get-page-title'
import store from '@/store'
import { getToken } from '@/utils/auth'

export interface Tag {
  icon: string | unknown
  router: string
  title: string | unknown
  fullPath: string
}

const routes: Array<RouteRecordRaw> = [
  ...appRoutes,
  ...applicationRoutes,
  ...datasetsRoutes,
  ...commonRoutes,
  ...systemRouter
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const accessToken = getToken()
  // 设置标题
  const title = to.meta.title as string
  if (title) {
    document.title = getPageTitle(title)
  }
  // 是否登录
  if (!accessToken && to.name !== 'login') {
    next({
      name: 'login'
    })
    return
  } else if (to.name === 'login') {
    // 登录页忽略tags存储
    next()
    return
  }

  // 储存顶部菜单栏 tags
  const getTags = localStorage.getItem('tagsView')
  const tags: Tag = {
    icon: to.meta.icon,
    router: to.path,
    title: to.meta.title,
    fullPath: to.fullPath
  }
  if (getTags) {
    const arr = JSON.parse(getTags)
    arr.push(tags)
    const obj: Record<string, number> = {}
    const arrs = arr.reduce((item: Tag[], next: Tag) => {
      obj[next.router] ? '' : (obj[next.router] = true && item.push(next))
      return item
    }, [])
    store.commit('system/ADD_TAGS', arrs)
    localStorage.setItem('tagsView', JSON.stringify(arrs))
  } else {
    const arrs = [tags]
    store.commit('system/ADD_TAGS', arrs)
    localStorage.setItem('tagsView', JSON.stringify(arrs))
  }
  next()
})

export default router

import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const appRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: '首页',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'dashboard',
      noCache: true
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true
        }
      }
    ]
  }
]

export default appRoutes

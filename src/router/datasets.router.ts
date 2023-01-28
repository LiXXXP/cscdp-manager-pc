import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const appRoutes: Array<RouteConfig> = [
  {
    path: '/datasets',
    name: 'Datasets',
    component: Layout,
    meta: { title: '数据中心', icon: 'gwin-management', keepAlive: false },
    redirect: '/datasets/screen',
    children: [
      {
        path: 'screen',
        name: 'Screen',
        component: () => import('@/views/datasets/screen/index.vue'),
        meta: { title: '数据大屏', keepAlive: false }
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('@/views/datasets/map/index.vue'),
        meta: { title: '公益板块数据', keepAlive: false },
        redirect: '/datasets/map/user',
        children: [
          {
            path: 'user',
            name: 'MapUser',
            component: () => import('@/views/datasets/map/user/index.vue'),
            meta: { title: '用户统计', keepAlive: false }
          },
          {
            path: 'content',
            name: 'MapContent',
            component: () => import('@/views/datasets/map/content/index.vue'),
            meta: { title: '内容统计', keepAlive: false }
          },
          {
            path: 'poi',
            name: 'MapPoi',
            component: () => import('@/views/datasets/map/poi/index.vue'),
            meta: { title: 'POI统计', keepAlive: false }
          }
        ]
      },
      {
        path: 'all',
        name: 'All',
        component: () => import('@/views/datasets/map/index.vue'),
        meta: { title: '全系统运营数据', keepAlive: false },
        redirect: '/datasets/all/user',
        children: [
          {
            path: 'user',
            name: 'AllUser',
            component: () => import('@/views/datasets/map/user/index.vue'),
            meta: { title: '用户统计', keepAlive: false }
          },
          {
            path: 'content',
            name: 'AllContent',
            component: () => import('@/views/datasets/map/content/index.vue'),
            meta: { title: '内容统计', keepAlive: false }
          },
          {
            path: 'poi',
            name: 'AllPoi',
            component: () => import('@/views/datasets/map/poi/index.vue'),
            meta: { title: 'POI统计', keepAlive: false }
          }
        ]
      }
    ]
  }
]

export default appRoutes

import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const applicationRoutes: Array<RouteConfig> = [
  {
    path: '/application',
    component: Layout,
    redirect: '/application',
    meta: {
      title: '应用管理',
      icon: 'application',
      noCache: true
    },
    children: [
      {
        path: 'application',
        name: 'Application',
        component: () => import('@/views/application/index.vue'),
        meta: {
          title: '应用管理',
          icon: 'application',
          noCache: true
        }
      }
    ]
  }
]

export default applicationRoutes

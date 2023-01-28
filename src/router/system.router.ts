import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const systemRouter: Array<RouteConfig> = [
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: { title: '系统管理', icon: 'component', keepAlive: false },
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '成员管理', keepAlive: false }
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/system/group/index.vue'),
        meta: { title: '部门管理', keepAlive: false }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '权限管理', keepAlive: false }
      },
      {
        path: 'enterprise/jurisdiction',
        name: 'jurisdiction',
        hidden: true,
        component: () => import('@/views/system/role/jurisdiction.vue'),
        meta: { title: '企业权限', keepAlive: false }
      }
    ]
  }
]

export default systemRouter

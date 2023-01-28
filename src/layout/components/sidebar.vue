<template>
  <div>
    <console-menu :menu-list="state.menuList"></console-menu>
  </div>
</template>

<script setup lang="ts">
import { ConsoleMenu } from '@gwin/platform-menu-pc'
import { computed, onMounted, reactive } from 'vue-demi'
import { useRouter } from 'vue-router'
import { RouteConfig } from '#/global'
import { getUserId } from '@/utils/auth'
import LogApi from '@/api/user/login'

const router = useRouter()

interface MenuItem {
  title: string
  icon?: string
  router?: string
  child?: MenuItem[]
  noCache?: boolean
  menuList?: string[]
}

const state = reactive(<any>{
  menuList: []
})

onMounted(() => {
  getUserResourceList()
})

async function getUserResourceList() {
  const res: any = await LogApi.getUserResourceList({
    category: 'menu',
    userId: getUserId()
  })
  menuCompare(data.value, res.body.dataList)
}

const data = computed(() => {
  const menuList: MenuItem[] = []
  router.options.routes.forEach((route) => {
    const menuItem: MenuItem | undefined = generateMenuItem(route as RouteConfig)
    if (menuItem) {
      menuList.push(menuItem)
    }
  })
  return menuList
})

function menuCompare(router: any[], newRouter: any[]) {
  const menu: any[] = []
  router.forEach((item, index) => {
    newRouter.forEach((element) => {
      if (item.title === element.label) {
        const list = JSON.parse(JSON.stringify(item))
        menu[index] = list
        menu[index].child = []
        item.child.forEach((list: { title: any }) => {
          if (element.children) {
            element.children.forEach((name: { label: any }) => {
              if (list.title === name.label) {
                menu[index].child.push(JSON.parse(JSON.stringify(list)))
              }
            })
          } else {
            menu[index].child.push(JSON.parse(JSON.stringify(list)))
          }
        })
      }
    })
  })

  const newList: any[] | undefined = []
  menu.forEach((item) => {
    newList.push(item)
  })

  state.menuList = newList
}

function generateMenuItem(route: RouteConfig, parent?: MenuItem): MenuItem | undefined {
  if (!route.hidden && route.meta) {
    const menuItem = route.meta as MenuItem
    if (parent) {
      if (parent.router === '/') {
        menuItem.router = parent.router + route.path
      } else {
        menuItem.router = parent.router + '/' + route.path
      }
    } else {
      menuItem.router = route.path
    }
    if (route.children) {
      menuItem.child = []
      route.children.forEach((r) => {
        const subMenuItem: MenuItem | undefined = generateMenuItem(r as RouteConfig, menuItem)
        if (subMenuItem) {
          menuItem.child?.push(subMenuItem)
        }
      })
    }
    return menuItem
  }
  return undefined
}
</script>

<style lang="scss" scoped></style>

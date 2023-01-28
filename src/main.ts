import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import './styles/index.scss' // global css

import 'virtual:svg-icons-register'

// 公共css
import '@gwin/platform-css-pc/lib/theme-default/index.css'

// svg-icon
import SvgIcon from '@gwin/svg-icon'
import '@gwin/svg-icon/lib/theme-default/index.css'

// console-menu
import ConsoleMenu from '@gwin/platform-menu-pc'
import '@gwin/platform-menu-pc/lib/theme-default/index.css'

// 网络配置
import { commonConfig, requestContextConfig } from '@gwin/networking'
import Cookies from 'js-cookie'

requestContextConfig.channel = 'pc'
requestContextConfig.entityId = 'csca'

Cookies.set('adminChannel', 'pc')
Cookies.set('adminEntityId', 'csca')

commonConfig.tokenKey = 'adminToken'
commonConfig.userIdKey = 'adminUserId'
commonConfig.entityIdKey = 'adminEntityId'

commonConfig.loginCallback = () => {
  router.push('/login')
}

commonConfig.noPermissionCallback = () => {
  router.push('/403')
}

// admin ui
import AdminUI from '@gwin/admin-ui'
import '@gwin/admin-ui/lib/theme-default/index.css'

const app = createApp(App)

import * as icons from '@element-plus/icons-vue'
Object.keys(icons as any).forEach((key) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.component(key, icons[key])
})
app.use(router).use(store).use(ElementPlus, { locale }).use(SvgIcon).use(ConsoleMenu).use(AdminUI).mount('#app')

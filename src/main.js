/*
 * @Author: lanjiaxuan lanjiaxuan@e6yun.com
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: lanjiaxuan lanjiaxuan@e6yun.com
 * @LastEditTime: 2023-05-15 23:54:32
 * @FilePath: /archery-web/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 引入element-plus
import ElementPlus from 'element-plus'
import './assets/style/element-variables.scss'

// 国际化
import i18n from '@/i18n'

// 全局注册element-plus/icons-vue
import * as ICONS from '@element-plus/icons-vue'
Object.entries(ICONS).forEach(([key, component]) => {
  // app.component(key === 'PieChart' ? 'PieChartIcon' : key, component)
  app.component(key, component)
})

// 引入路由
import router from './router'

// 引入pinia
import pinia from './pinia'

// 权限控制
import './permission'

// 引入svg图标注册脚本
import 'vite-plugin-svg-icons/register'

// 注册全局组件
import * as Components from './global-components'
Object.entries(Components).forEach(([key, component]) => {
  app.component(key, component)
})

// 注册自定义指令
import * as Directives from '@/directive'
Object.values(Directives).forEach(fn => fn(app))

// 错误日志
import useErrorHandler from './error-log'
useErrorHandler(app)

app
  .use(i18n)
  .use(ElementPlus)
  .use(pinia)
  .use(router)
  .mount('#app')

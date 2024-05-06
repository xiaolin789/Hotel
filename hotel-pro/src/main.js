import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/http/index'
// import myconfirm from '@/utils/myconfirm'
// 引入Pinia构造函数
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
//实例化 Pinia
const pinia = createPinia()
// 使用持久化插件
pinia.use(piniaPersist)

const app = createApp(App)
app.use(store).use(router).use(ElementPlus,{
  locale: zhCn
}).use(pinia)
.mount('#app')


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }


  const debounce = (fn, delay) => {
    let timer = null
    return function () {
      let context = this
      let args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }

  const _ResizeObserver = window.ResizeObserver
  window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
      callback = debounce(callback, 16)
      super(callback)
    }
  }

  
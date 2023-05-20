import Vue from 'vue'
// 引入vuerouter
import VueRouter from 'vue-router'

import App from './App.vue'
// 映入路由器
import router from './router'
// 引入store 
import store from './store'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'

const loadimage = require('./assets/loding.gif')

Vue.config.productionTip = false
Vue.use(VueRouter)
// 应用图片懒加载组件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading:loadimage
})

new Vue({
  el:'#app',
  // 应用配置项
  router,
  store,
  render: h => h(App),
})

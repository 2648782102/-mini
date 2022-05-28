import Vue from 'vue'
// 引入vuerouter
import VueRouter from 'vue-router'
import App from './App.vue'
// 引入font-awesome图标库
import '@fortawesome/fontawesome-free/css/all.css'
// 映入路由器
import router from './router'
// 引入store 
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  el:'#app',
  // 应用配置项
  router,
  store,
  render: h => h(App),
})

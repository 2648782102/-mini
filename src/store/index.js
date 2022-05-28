// 该文件用于创建vuex最为核心的store
// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入count.js
import musicData from './musicData'
// 应用vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        musicData
    }
})
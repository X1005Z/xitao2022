import Vue from 'vue'
import App from './App.vue'

// 导入vantui组件库
import './vantui.js'

// 导入规范化样式normalize
import './assets/css/normalize.css'

// 导入路由模块
import router from './router/index.js'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
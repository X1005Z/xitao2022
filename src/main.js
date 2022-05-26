import Vue from 'vue'
import App from './App.vue'

// 导入vantui组件库
import './vantui.js'

// 导入工具函数
import './utils/index.js'

// 导入规范化样式normalize
import './assets/css/normalize.css'

// 导入路由模块
import router from './router/index.js'
// 导入仓库store
import store from './store/index.js'

// 导入vue-clipboard2
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

// 导入nprogress的css样式
import '../node_modules/nprogress/nprogress.css'



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
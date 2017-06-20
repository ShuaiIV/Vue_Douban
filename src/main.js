// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入vue-resource组件并使用
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 导入mint-ui 并在全局使用
import Mint from 'mint-ui'
Vue.use(Mint)
// 导入mint-ui的CSS文件
import 'mint-ui/lib/style.min.css'

// 导入自己的CSS样式
import '../static/css/style.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

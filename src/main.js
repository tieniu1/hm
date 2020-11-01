import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
//引入全局css
import './styles/index.scss'//加./main的同级目录开始找，不加会从node_modules找
//引入amfe-flexible.js
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

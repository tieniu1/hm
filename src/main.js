import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.css'
import 'vant/lib/index.css'

Vue.config.productionTip = false

import { Button, RadioGroup, Radio } from 'vant'

[Button, RadioGroup, Radio].forEach(e => { Vue.use(e)})

//创建vue根实例，将router、store 配置到根实例中
//把App 根示例组件渲染到#app节点（#app在index.html）
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

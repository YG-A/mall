import Vue from 'vue'
import App from './App.vue'
import router from './router/index'// 引入自定义的路由器

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

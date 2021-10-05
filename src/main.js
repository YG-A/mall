import Vue from 'vue'
import router from './router/index'// 引入自定义的路由器
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import env from './env'

// 根据前端的跨域方式做调整
// axios.defaults.baseURL = '/api'// 因为devServer中配置了host,与port所以写一个/api也能用
// 根据【环境变量】获取不同的请求地址
axios.defaults.baseURL = env.baseURL
console.log(axios.defaults.baseURL);
axios.defaults.timeout = 8000

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  let res = response.data
  if(res.status === 0){// 1.根据文档，服务器响应的数据中status属性为0表示成功
    // 2.根据文档，成功则返回响应数据中的data属性
    return res.data
  }else if(res.status === 10){
    // status为10表示未登录
    window.location.href = '/#/login'// 可以不写全路径，只写pathname
  }else{
    alert(res.msg)
  }
}, function (error) {
  return Promise.reject(error);
});

Vue.use(VueAxios,axios)// 将axios弄到vue中，这样就可以直接vm或vc.axios.xxx


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

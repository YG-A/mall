import Vue from 'vue'
import router from './router/index'// 引入自定义的路由器
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
// import env from './env'

//mock开关，不用这个时一定要关闭，否则会把任何请求都拦截
const mock = false
if(mock){
  require('./mock/api')
}

// 以下几种baseURL根据前端的跨域方式做调整即可，并非固定的
// axios.defaults.baseURL = '/api'// 写一个/api的意思就是在当前域名和接口下的http://localhost:8080/api
axios.defaults.baseURL = 'https://mock.mengxuegu.com/mock/615c6699912f2644883cb130/api'// easy-mock中配置得到的地址
axios.defaults.timeout = 8000
// axios.defaults.baseURL = env.baseURL// 根据【环境变量】获取不同的请求地址
// console.log(axios.defaults.baseURL);

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

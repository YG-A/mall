import Vue from 'vue'
import router from './router/index'// 引入自定义的路由器
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload' // lazy-load插件
import { Message,Select,Option } from 'element-ui'
import VueCookie from 'vue-cookie'
import App from './App.vue'

// import env from './env'

//mock开关，不用这个时一定要关闭，否则会把任何请求都拦截
const mock = false
if(mock){
  require('./mock/api')
}

// 以下几种baseURL根据前端的跨域方式做调整即可，并非固定的
axios.defaults.baseURL = '/api'// 写一个/api的意思就是在当前域名和接口下的http://localhost:8080/api
// axios.defaults.baseURL = 'https://mock.mengxuegu.com/mock/615c6699912f2644883cb130/api'// easy-mock中配置得到的地址
// axios.defaults.baseURL = env.baseURL// 根据【环境变量】获取不同的请求地址
axios.defaults.timeout = 8000// 设置延迟等待的时间

// 添加响应拦截器start
axios.interceptors.response.use(function (response) {
  let res = response.data
  if(res.status === 0){// 1.根据文档，服务器响应的数据中status属性为0表示成功
    // 2.根据文档，成功则返回响应数据中的data属性
    if(res.data !== undefined){
      return res.data
    }else{
      return res
    }
  }else if(res.status === 10){
    // status为10表示未登录
    if(location.hash !== '#/index'){
      // 如果用户不在首页，还请求了一些需要登录后才能进行的操作，则自动跳转到登录页
      window.location.href = '/#/login'// 可以不写全路径，只写pathname
      // return Promise.reject(res)
    }
    return Promise.reject(res.msg);
  }else{
    // 已注册、用户名不存在、密码错误等等
    // console.log('我');
    Message.error(res.msg)// 使用
    return Promise.reject(res.msg);
  }
}, function (error) {
  // Vue.$message.error(error.msg)// element-ui的插件
  // Message.error(error.msg)// 使用
  return Promise.reject(error);
});
// 添加响应拦截器end

// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
class DonMessage {
  success (options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning (options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info (options, single = true) {
    this[showMessage]('info', options, single)
  }
  error (options, single = true) {
    this[showMessage]('error', options, single)
  }

  [showMessage] (type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
}

Vue.use(VueAxios,axios)// 将axios弄到vue中，这样就可以直接vm或vc.axios.xxx
Vue.use(VueCookie)// vuecookie插件，便于操作cookie
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载图片的高度
  // error: 'dist/error.png', //图片找不到时，提示错误的占位图
  loading: '/imgs/loading-svg/loading-bars.svg', //加载时，显示这个占位图片
  attempt: 1// 尝试请求那个图片的次数，如果次数过了还没请求到，就直接显示错误图片
})
Vue.component(Message.name, Message)
// Vue.prototype.$message = Message
Vue.prototype.$message = new DonMessage()// 
Vue.use(Select);
Vue.use(Option);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

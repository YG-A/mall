import Vue from "vue"
import VueRouter from "vue-router"

/* 
  1.有多少页设计稿，就有多少个页面，
  2.根据页面去【划分路由】
  3.再从页面中去找相似之处，找共性，然后拆分、提取成子组件
*/
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
import Product from '../pages/product.vue'
import Detail from '../pages/detail.vue'
import Cart from '../pages/cart.vue'
import Order from '../pages/order.vue'
import OrderConfirm from '../pages/orderConfirm.vue'
import OrderList from '../pages/orderList.vue'
import OrderPay from '../pages/orderPay.vue'
import Alipay from '../pages/alipay.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: 'index',// 默认重定向到子路由
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'product/:id',
          name: 'product',
          component: Product
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail
        },
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: OrderList
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: OrderConfirm
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: Alipay
        }
      ]
    }
  ]
})
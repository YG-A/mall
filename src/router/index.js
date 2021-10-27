import Vue from "vue"
import VueRouter from "vue-router"

/* 
  1.有多少页设计稿，就有多少个页面，
  2.根据页面去【划分路由】
  3.再从页面中去找相似之处，找共性，然后拆分、提取成子组件
*/

import Home from '../pages/home.vue'
import Index from '../pages/index.vue'

// import Product from '../pages/product.vue'
// import Detail from '../pages/detail.vue'
// import Cart from '../pages/cart.vue'
// import Order from '../pages/order.vue'
// import OrderConfirm from '../pages/orderConfirm.vue'
// import OrderList from '../pages/orderList.vue'
// import OrderPay from '../pages/orderPay.vue'
// import Alipay from '../pages/alipay.vue'
// import Login from '../pages/login.vue'
// import Register from '../pages/register.vue'

// 路由懒加载,方式一
// const Product = resolve => require(['../pages/product.vue'],resolve)
// const Detail = resolve => require(['../pages/detail.vue'],resolve)
// const Cart = resolve => require(['../pages/cart.vue'],resolve)
// const Order = resolve => require(['../pages/order.vue'],resolve)
// const OrderConfirm = resolve => require(['../pages/orderConfirm.vue'],resolve)
// const OrderList = resolve => require(['../pages/orderList.vue'],resolve)
// const OrderPay = resolve => require(['../pages/orderPay.vue'],resolve)
// const Alipay = resolve => require(['../pages/alipay.vue'],resolve)
// const Login = resolve => require(['../pages/login.vue'],resolve)
// const Register = resolve => require(['../pages/register.vue'],resolve)

const Product = () => import('../pages/product.vue')
const Detail = () => import('../pages/detail.vue')
const Cart = () => import('../pages/cart.vue')
const Order = () => import('../pages/order.vue')
const OrderConfirm = () => import('../pages/orderConfirm.vue')
const OrderList = () => import('../pages/orderList.vue')
const OrderPay = () => import('../pages/orderPay.vue')
const Alipay = () => import('../pages/alipay.vue')
const Login = () => import('../pages/login.vue')
const Register = () => import('../pages/register.vue')

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: 'index',// 重定向到/index下
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
      redirect: '/order/list',// 重定向到/order/list
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
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ]
})
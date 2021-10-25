<template>
  <div>
    <!-- 
      因为每个页面都有头部和底部组件,所以直接把头部尾部定义固定出来
      中间用一个router-view来动态改变不同组件(即不同页面)
    -->
    <order-header :title="title">
      <template #tips>
        <p class="tips">{{tip}}</p>
      </template>
    </order-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from '../components/OrderHeader.vue'
import NavFooter from '../components/NavFooter.vue'
export default {
  name: 'order',
  data() {
    return {
      title: '',
      tip: ''
    }
  },
  components: {
    OrderHeader,NavFooter
  },
  watch:{
    $route(to){
      let path = to.path// to就是新(前往的路由)的$route对象
      // console.log(path)
      if(path === '/order/confirm'){
        this.title = '订单确认'
        this.tip = '请认真填写收货地址'
      }else if(path === '/order/list'){
        this.title = '订单列表'
        this.tip = '谨防钓鱼链接或诈骗电话'
      }else if(path === '/order/pay'){
        this.title = '订单支付'
        this.tip = '谨防钓鱼链接或诈骗电话'
      }
    }
  },
  mounted() {
    let path = this.$route.path
    if(path === '/order/confirm'){
      this.title = '订单确认'
      this.tip = '请认真填写收货地址'
    }else if(path === '/order/list'){
      this.title = '订单列表'
      this.tip = '谨防钓鱼链接或诈骗电话'
    }else if(path === '/order/pay'){
      this.title = '订单支付'
      this.tip = '谨防钓鱼链接或诈骗电话'
    }else{
      this.title = 'aliPay'
      this.tip = '谨防钓鱼链接或诈骗电话'
    }
  },
}
</script>
<style lang="">
  
</style>
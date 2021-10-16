<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      res: {}
    }
  }, 
  methods: {
    // 获取用户信息，为了只去请求一次(除非刷新页面就会重新请求)，所以定义在顶层App组件中
    // 后端，通过前面保存的cookie中的userId去查询用户信息，如果没有保存对应cookie则，返回未登录{status:10,msg:'NEED_LOGIN'}
    getUser(){
      this.axios.get('/user').then((res)=>{
        // 保存username到vuex中
        this.$store.dispatch('saveUserName',res.username)
      }).catch((error)=>{
        console.log('用户信息获取不了，需要登录'+error);
      })
    },
    getCartCount(){// 获取购物车信息
      this.axios.get('/carts/products/sum').then((res)=>{
        // 保存到购物车中商品数量到vuex中
        console.log(res);
        this.$store.dispatch('saveCartCount',res)
      }).catch((error)=>{
        console.log('购物车商品数量获取不到，需要登录'+error);
      })
    }
  },
  mounted() {
    this.getUser()
    this.getCartCount()
  }
}
</script>

<style lang='scss'>
  @import './assets/scss/reset.scss'; 
  @import './assets/scss/base.scss'; 
  @import './assets/scss/button.scss';
</style>

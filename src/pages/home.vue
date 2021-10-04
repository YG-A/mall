<template>
  <div>
    <!-- 
      因为每个页面都有头部和底部组件,所以直接把头部尾部定义固定出来
      中间用一个router-view来动态改变不同组件(即不同页面)
    -->
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
export default {
  name: ''
}
</script>
<style lang="">
  
</style>
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
  mounted() {
    /* 
      使用插件vue-axios把axios挂到Vue.prototype了所以this就能调用
      这里假设后端接口还没开发好，但是开发文档已经有了，根据文档规则先创建一些json文件来请求，
      去模拟从后端请求到的数据对象，这是以后公司可能会用到的称为Mock的开发技巧

      由于mock文件放在public下，public下的文件在请求时可直接写路径，默认就是这个域名和端口下的pathname
    */
    this.axios.get('/mock/user/login.json').then((response)=>{
      this.res = response
    }).catch((error)=>{
      console.log(error);
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="detail">
    <!-- 正常结构中参数栏 -->
    <product-params :productName="productInfo.name"></product-params>
    <!-- 滚动时绝对定位的参数栏 -->
    <transition name="params-fixed" >
      <product-params v-show="paramsShow" :posFix="true" :productName="productInfo.name"></product-params>
    </transition>
  </div>
</template>
<script>
import ProductParams from '../components/ProductParams.vue'
export default {
  name: 'detail',
  components:{
    ProductParams
  },
  data() {
    return {
      paramsShow: false,
      productInfo: {},// 根据请求
    }
  },
  methods: {
    getProductInfo(){
      let productId = this.$route.params.id
      this.axios.get(`/products/${productId}`)
      .then((res)=>{
        this.productInfo = res
      })
    }
  },
  mounted() {
    this.getProductInfo()
  },
}
</script>
<style lang="scss">
  .detail{
    .btn.params-last{
      margin-left: 11px;
    }
    .posFix{
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10;
      transition: all 0.3s;
      overflow: hidden;
    }
  }
</style>
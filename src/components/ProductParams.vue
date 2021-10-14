<template>
  <div class="nav-bar" :class="{'posFix': posFix}">
    <div class="container">
      <h2 class="pro-title">{{productName}}</h2>
      <div class="pro-params">
        <a class="params-item" href="javascript:;">概述</a>
        <span class="sep">|</span>
        <a class="params-item" href="javascript:;">参数</a>
        <span class="sep">|</span>
        <a class="params-item" href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  name: 'product-params',
  props: {
    posFix:{
      type: Boolean,
      default: false
    },
    productName: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-bar{
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 5px 5px rgba(0,0,0,0.07);
    height: 63px;
    background-color: #fff;
    .container{
      display: flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      .pro-title{
        font-size: 18px;
        font-weight: 400;
        color: #424242;
      }
      .pro-params{
        a.params-item{
          color: #616161;
          font-size: 14px;
          &:hover{
            color: #ff6700;
          }
        }
        .sep{
          color: #e0e0e0;
          margin: 0 8px;
        }
        
      }
    }
  }
</style>
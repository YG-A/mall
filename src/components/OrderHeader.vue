<template>
  <div class="order-header">
    <div class="header-box container clearfix">
      <div class="header-logo">
        <a href="/#/index" title="小米官网">小米官网</a>
      </div>
      <div class="header-title">
        <h2 class="title">{{title}}</h2>
        <!-- 温馨提示: 产品是否购买成功，以最终下单为准哦，请尽快结算 -->
        <!-- {{tips}} -->
        <slot name="tips"></slot>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>

  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'order-header',
  props: {
    title:{
      title: String,
      tips: String
    }
  },
  computed:{
    ...mapState(['username','cartCount'])
  }
}
</script>
<style lang="scss">
  @import '../assets/scss/base.scss';
  @import '../assets/scss/mixin.scss';
  .order-header{
    .header-box{
      height: 55px;
      padding: 28.5px 0;
      line-height: 55px;
      .header-logo{
        float: left;
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: #FF6600;
        overflow: hidden;
        a{
          display: inline-block;
          font-size: 0;
          width: 110px;
          height: 55px;
          transition: margin 200ms;
          &::before{
            content: '';
            @include bgImg(55px,55px,'/imgs/mi-logo.png');// 专门设置背景图片的混合
          }
          &::after{
            content: '';
            @include bgImg(55px,55px,'/imgs/mi-home.png');// 专门设置背景图片的混合
          }
          &:hover{
            margin-left: -55px;
          }
        }
      }
      .header-title{
        float: left;
        margin-left: 52px;
        .title{
          float: left;
          font-size: 28px;
          font-weight: 400;
        }
        .tips{
          float: left;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          color: #757575;
          margin: 24px 0 0 15px;
        }
        
      }
      .username{
        float: right;
        a{
          display: inline-block;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          color: #757575;
          margin: 24px 0 0 15px;
          &:hover{
            color: #FF6700;
          }
        }
      }
    }

  }
</style>
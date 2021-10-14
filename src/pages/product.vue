<template>
  <div class="product">
    <!-- 正常结构中参数栏 -->
    <product-params :productName="productInfo.name">
      <template #buy>
        <a class="btn params-last">立即购买</a>
      </template>
    </product-params>
    <!-- 滚动时绝对定位的参数栏 -->
    <transition name="params-fixed" >
      <product-params v-show="paramsShow" :posFix="true" :productName="productInfo.name">
        <template #buy>
          <a class="btn params-last">立即购买</a>
        </template>
      </product-params>
    </transition>
    <div class="content">
      <div class="item-bg1">
        <h2 class="title">{{productInfo.name}}</h2>
        <h3 class="subTitle">{{productInfo.subtitle}}</h3>
        <div class="introduce">
          <a href="javascript:;">全球首款双频 GP</a>
          <span class="sep">|</span>
          <a href="javascript:;">骁龙845</a>
          <span class="sep">|</span>
          <a href="javascript:;">AI 变焦双摄</a>
          <span class="sep">|</span>
          <a href="javascript:;">红外人脸识别</a>
        </div>
        <div class="price">
          <span class="icon">￥</span><span>{{productInfo.price}}</span>
        </div>
      </div>
      <div class="item-bg2">
      </div>
      <div class="item-bg3">
      </div>
      <div class="item-swiper">
        <swiper :options="swiperOptions">
          <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg" @click="playVideo"></div>
        <div class="video-box" >
          <div class="overlay" v-show="showSlide"></div> <!--遮罩层-->
          <div class="video" :class="{'slideDown':showSlide}"> 
            <div class="icon-close" @click="closeVideo"></div>
            <!-- 设置自动播放的同时设置muted(静音)，才能有效 -->
            <video ref="video" src="/imgs/product/video.mp4" controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductParams from '../components/ProductParams.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'product',
  components:{
    ProductParams,
    swiper,
    swiperSlide
  },
  data() {
    return {
      paramsShow: false,
      showSlide: false,
      productInfo: {},// 根据请求
      // swiper配置项
      swiperOptions: {
        loop: true,
        speed: 1000,// 切换一张需要的时间，1000ms
        slidesPerView:3,
        spaceBetween: 30,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },

      },
    }
  },
  mounted() {
    // 绑定事件时，尽量将事件对应的函数声明出来，以便在销毁组件时，解绑事件
    // 因为只有本组件中需要页面滚动事件，所以组件destroyed时一定要移除事件
    window.addEventListener('scroll',this.initHeight)
    this.getProductInfo()
  },
  methods: {
    initHeight(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 204 && this.paramsShow === false){
        this.paramsShow = true
      }else if(scrollTop <= 204 && this.paramsShow === true){
        this.paramsShow = false
      }
    },
    playVideo(){
      this.showSlide = true
      console.log(this.$refs.video.play());
    },
    closeVideo(){
      this.showSlide = false
      this.$refs.video.currentTime = 0
      this.$refs.video.pause()
    },
    getProductInfo(){
      let productId = this.$route.params.id
      this.axios.get(`/products/${productId}`)
      .then((res)=>{
        this.productInfo = res
      })
    }
  },
  destroyed() {
    // 当路由跳转到其他组件时，这个自动卸载，
    window.removeEventListener('scroll',this.initHeight)
  },
}
</script>
<style lang="scss" scoped>
  .product{
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
    .content{
      .item-bg1{
        height: 718px;
        background: url('/imgs/product/product-bg-1.png') no-repeat center;
        background-size: auto 100%;
        text-align: center;
        .title{
          font-size: 80px;
          padding-top: 55px;
        }
        .subTitle{
          font-size: 24px;
          // 字间距，表示一行文字，字与字之间空格的宽度
          letter-spacing: 10px;
        }
        .introduce{
          margin: 21px 0 40px 0;
          a{
            font-size: 16px;
            color: #333;
          }
          .sep{
            margin: 0 15px;
          }
        }
        .price{
          color: #333;
          .icon{
            font-size: 30px;
          }
          span{
            font-size: 38px;
          }
        }
      }
      .item-bg2{
        height: 480px;
        background: url('/imgs/product/product-bg-2.png') no-repeat center;
        background-size: auto 100%;
      }
      .item-bg3{
        height: 638px;
        background: url('/imgs/product/product-bg-3.png') no-repeat center;
        background-size: auto 100%;
      }
      .item-swiper{
        margin: 36px auto 52px;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
          vertical-align: middle;
        }
      }
      .item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
        text-align:center;
        h2{
          font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
        }
        p{
          font-size:24px;
          margin-bottom:58px;
        }
        .video-bg{
          background:url('/imgs/product/gallery-1.png') no-repeat center;
          background-size:cover;
          width:1226px;
          height:540px;
          margin:0 auto 120px;
          cursor:pointer;
        }
        .video-box{
          // display: none;
          .overlay{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            background-color: rgba(0,0,0,0.5);
          }
          .video{
            position: fixed;
            width: 1000px;
            height: 536px;
            left: 50%;
            top: -50%;
            transform: translate(-50%,-50%);
            z-index: 11;
            @keyframes slideDown {
              from{
                opacity: 0;
                top: -50%;
              }
              to{
                opacity: 1;
                top: 50%;
              }
            }
            &.slideDown{
              animation: slideDown 0.3s linear 0s 1 forwards;
            }
            &.slideUp{
              animation: slideDown 0.3s linear 0s 1 reverse forwards;
            }
            .icon-close{
              position: absolute;
              cursor: pointer;
              right: 20px;
              top: 20px;
              width: 20px;
              height: 20px;
              background: url('/imgs/icon-close.png') no-repeat center; 
              z-index: 11;
            }
            video{
              width: 100%;
              height: 100%;
              object-fit: cover;
              outline: none;
            }
          }
        }
      }
    }
  }


  .params-fixed-enter,.params-fixed-leave-to{
    height: 0;
  }
  .params-fixed-enter-to,.params-fixed-leave{
    height: 63px;
  }
</style>
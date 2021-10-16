<template>
  <div class="detail">
    <!-- 正常结构中参数栏 -->
    <product-params :productName="productInfo.name"></product-params>
    <!-- 滚动时绝对定位的参数栏 -->
    <transition name="params-fixed" >
      <product-params v-show="paramsShow" :posFix="true" :productName="productInfo.name">
      </product-params>
    </transition>
    
    <div class="content">
      <div class="page-info">
        <div class="product-box container">
          <!-- 轮播图 -->
          <div class="swiper-left">
            <swiper class="swiper-no-swiping" ref="mySwiper" :options="swiperOptions">
              <!-- 每一项 -->
              <swiper-slide><img src="/imgs/detail/phone-1.jpg" alt=""></swiper-slide>
              <swiper-slide><img src="/imgs/detail/phone-2.jpg" alt=""></swiper-slide>
              <swiper-slide><img src="/imgs/detail/phone-3.jpg" alt=""></swiper-slide>
              <!-- 分页器 -->
              <div class="swiper-pagination" slot="pagination"></div>
              <!-- 上一页，下一页的按钮 -->
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </swiper>
          </div>
          <div class="product-right">
            <h2 class="product-name">{{productInfo.name}}</h2>
            <p class="product-info">
              <font color='#f6700'>
                「购机可享6期免息，信用卡分期最高立减200元；评价晒单前5000名送Xiaomi Civi 马卡龙色系硅胶保护壳」
              </font>
              轻薄潮流设计 | 丝绒AG工艺 | 原生美肌人像 | 像素级肌肤焕新技术 | 3200万高清质感自拍 | 双柔光灯+自动对焦 | 3D曲面OLED柔性屏 | 120Hz+Dolby Vision | 4500mAh 大电量 | 55W有线闪充 | 立体声双扬声器 | 多功能NFC
            </p>
            <p class="company-info" 
              title="企业名称：小米通讯技术有限公司
              企业执照注册号：91110108558521630L
              企业地址：北京市海淀区西二旗中路33号院6 号楼9层019号
              企业电话：400-100-5678
              营业期限：2010年08月25日 至 2040年08月24日
              经营范围：开发手机技术、计算机软件及信息技术；技术检测、技术咨询、技术服务、技术转让；计算机技术培训；系统集成；货物进出口、技术进出口、代理进出口；家用电器、通信设备、广播电视设备（不含卫星电视广播、地面接收装置）、机械设备、电子产品、文化用品的批发零售；维修仪器仪表；销售医疗器械I类、II、III类、针纺织品（含家纺家饰）、服装鞋帽、日用杂货、工艺品、文化用品、体育用品、照相器材、卫生用品（含个人护理用品）、钟表眼镜、箱包、家具（不从事实体店铺经营）、小饰品、日用品、乐器、自行车、智能卡；计算机、通讯设备、家用电器、电子产品、机械设备的技术开发、技术服务；销售金银饰品（不含金银质地纪念币）；家用空调的委托生产；委托生产翻译机；销售翻译机、五金交电（不含电动自行车）、厨房用品、陶瓷制品、玻璃制品、玩具、汽车零配件、食用农产品、花卉、苗木、宠物用品、建筑材料、装饰材料、化妆品、珠宝首饰、通讯设备、卫生间用品、农药；生产手机（仅限在海淀区永捷北路2号三层生产及外埠生产）；出版物批发；出版物零售；销售食品。（销售第三类医疗器械以及销售食品以及依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动。）">
              小米自营
            </p>
            <p class="product-price">{{productInfo.price}}元</p>
            <div class="line"></div>
            <div class="product-address">
              <span class="address-icon"></span>
              <div class="address-con">
                <span>湖北</span>
                <span>武汉市</span>
                <span>江岸区</span>
                <span>后湖街道</span>
              </div>
              <div class="desc">
                有现货
              </div>
            </div>
            <div class="buy-option">
              <div class="buy-box-child" v-for="(item,index) in optionalOptions" :key="index">
                <div class="title">{{item.title}}</div>
                <ul class="opitions">
                  <li :title="el" :class="{'active': opitionsIndex[index] === i}" @click="selectOp(index,i)" v-for="(el,i) in item.opition" :key="i">
                    <a href="javascript:;">{{el}}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="selected-list">
              <ul>
                <!-- 
                  v-if与v-for不能在同一个组件或标签上使用
                  如果碰到需求真的需要一起用呢？ 请使用template标签来套住目的标签，然后在template上使用v-for
                  在目的标签上使用v-if，且:key也必须在原标签上,因为虚拟标签template最终会被移除掉，key无法用来标识其虚拟节点
                 -->
                <template v-for="(item, index) in selectedList">
                  <li v-if="item.price !== 0" :key="index" >
                    {{item.desc}}
                    <span>{{item.price}}元</span>
                  </li>
                </template>
              </ul>
              <div class="total-price">
                总计: {{totalPrice}}元
              </div>
            </div>
            <div class="addCart">
              <a @click="addCart" class="btn btn-huge">添加到购物车</a>
            </div>
          </div>
        </div>
      </div>
      <!--...-->
    </div>
    <div class="price-detail">
      <div class="container">
        <h3>价格说明</h3>
        <div class="img-box">
          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/43e2954feb6d1b108438481f1d5b0bd3.png" alt="">
        </div>
      </div>
    </div>
    <!-- 首页靠后部分的，服务选项栏 -->
    <service-bar></service-bar>
  </div>
</template>
<script>
import ProductParams from '../components/ProductParams.vue'
import ServiceBar from '../components/ServiceBar.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'detail',
  components:{
    ProductParams,
    ServiceBar,
    swiper,
    swiperSlide
  },
  data() {
    return {
      paramsShow: false,// topBar是否需要绝对定位
      productInfo: {},// 产品信息，根据请求
      opitionsIndex: {// 选择版本，颜色等等的索引
        version: 0,// 版本
        color: 0,// 颜色
        coordinates: 0// 套装
      },
      optionalOptions:{
        version: {
          title: '选择版本',
          opition: ['8GB+128GB','12GB+256GB','8GB+256GB'],
          price: [0,0,0]
        },
        color: {
          title: '选择颜色',
          opition: ['闪闪黑','轻轻蓝','怦怦粉'],
          price: [0,0,0]
        },
        coordinates:{
          title: '选择套装',
          opition: ['标准版','套装版(赠充电)'],
          price: [0,69]
        }
      },
      // swiper配置项
      swiperOptions: {
        effect : 'fade',//切换效果改为淡入淡出
        loop: true,
        speed: 1000,// 切换一张需要的时间，1000ms
        autoplay: {
          delay: 3000,
          pauseOnMouseEnter: true,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
    }
  },
  computed: {
    selectedOpition(){
      let selected = {}
      for (const key in this.opitionsIndex) {
        let val = this.opitionsIndex[key]
        selected[key] = this.optionalOptions[key].opition[val]
      }
      return selected
    },
    selectedList(){
      let temp = this.selectedOpition
      let selectedList = []
      let obj = {}
      let basicInfo = `${this.productInfo.name} ${temp.version} ${temp.color}`
      obj.desc = basicInfo
      obj.price = this.optionalOptions.version.price[this.opitionsIndex['version']] + this.optionalOptions.color.price[this.opitionsIndex['color']]
      selectedList.push(obj)
      for (const key in temp) {
        let obj = {}
        if(key !== 'version' && key !== 'color'){
          obj.desc = temp[key]
          obj.price = this.optionalOptions[key].price[this.opitionsIndex[key]]
          selectedList.push(obj)
        }
      }
      return selectedList
    },
    totalPrice(){
      let total = 0
      this.selectedList.forEach(element => {
        // console.log(element.price);
        total += element.price
      });
      return total
    }
  },
  methods: {
    selectOp(index,value){
      // this.$set(this.opitionsIndex,index,value)
      this.opitionsIndex[index] = value
      console.log(this.selectedOpition);
    },
    initHeight(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 204 && this.paramsShow === false){
        this.paramsShow = true
      }else if(scrollTop <= 204 && this.paramsShow === true){
        this.paramsShow = false
      }
    },
    getProductInfo(){
      let productId = this.$route.params.id
      this.axios.get(`/products/${productId}`)
      .then((res)=>{
        this.productInfo = res
      })
    },
    addCart(){
      let productId = this.$route.params.id
      this.axios.post('/carts',{
        productId,
        selected: true
      }).then((res)=>{
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
        this.$router.push('/cart')
      }).catch((error)=>{
        console.log(error);
      })
    }
  },
  watch: {
    productInfo(newVal){
      // console.log(newVal.price);
      let price = newVal.price
      this.optionalOptions.version.price = [price,price+1000,price+500]
    }
  },
  mounted() {
    window.addEventListener('scroll',this.initHeight)
    this.getProductInfo()
  },
  destroyed() {
    // 当路由跳转到其他组件时，这个自动卸载，
    window.removeEventListener('scroll',this.initHeight)
  }
}
</script>
<style lang="scss" scoped> 
  @import '../assets/scss/mixin.scss';
  .detail{
    font-size: 14px;
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
      .page-info{
        .product-box{
          display: flex;
          justify-content: space-between;
          padding-top: 32px;
          .swiper-left{
            /* swiper的设置不能scoped */
            width: 606px;
          }
          .product-right{
            flex: 1;
            margin-left: 20px;
            .product-name{
              font-size: 24px;
              font-weight: 400;
              color: #212121;
            }
            .product-info{
              color: #b0b0b0;
              padding-top: 8px;
              line-height: 1.5;
              font-size: 14px;
            }
            .company-info{
              color: #ff6700;
              font-size: 14px;
              margin-top: 14px;
            }
            .product-price{
              font-size: 18px;
              color: #ff6700;
              line-height: 1;
              padding: 12px 0 10px;
            }
            .line{
              height: 0;
              border-bottom:1px solid #e0e0e0;
              margin-top: 12px;
            }
            .product-address{
              margin: 20px 0;
              padding: 30px 50px;
              position: relative;
              border: 1px solid #e0e0e0;
              background-color: #fafafa;
              .address-icon{
                position: absolute;
                left: 30px;
                top: 30px;
                @include bgImg(20px,20px,'/imgs/detail/icon-loc.png')
              }
              .address-con{
                span{
                  margin-right: 14px;
                }
              }
              .desc{
                color: #ff6700;
              }
            }
            .buy-option{
              .buy-box-child{
                margin-bottom: 30px;
                .title{
                  font-size: 18px;
                }
                .opitions{
                  li{
                    font-size: 16px;
                    width: 292px;
                    height: 42px;
                    line-height: 42px;
                    border: 1px solid #e0e0e0;
                    transition: all 0.2s ease;
                    text-align: center;
                    margin-top: 10px;
                    a{
                      display: block;
                      color: #757575;
                    }
                    &.active{
                      border-color: #ff6700;
                      a{
                        color: #ff6700;
                      }
                    }
                    &:hover{
                      border-color: #ff6700;
                      a{
                        color: #ff6700;
                      }
                    }
                  }
                }
              }
            }
            .selected-list{
              background-color: #f9f9fa;
              padding: 30px;
              margin-bottom: 30px;
              ul{
                li{
                  display: flex;
                  justify-content: space-between;
                  line-height: 30px;
                }
              }
              .total-price{
                padding-top: 20px;
                color: #ff6700;
                font-size: 24px;
              }
            }
            .addCart{
              margin-bottom: 40px;
            }
          }
        }
      }
    }
    .price-detail{
      padding-bottom: 50px;
      background-color: #f5f5f5;
      h3{
        padding: 22px 0;
        font-weight: 400;
        font-size: 22px;
      } 
      .img-box{
        height: 189px;
        img{
          height: 100%;
          vertical-align: middle;
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
<style lang="scss">
  .content{
    .page-info{
      .product-box{
        .swiper-left{
          .swiper-container{
            width: 560px;
            margin: 0;
            .swiper-slide{
              img{
                width: 560px;
                height: 560px;
                vertical-align: middle;
              }
            }
            .swiper-button-prev,.swiper-button-next{
              width: 41px;
              height: 69px;
              background: url('https://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png') no-repeat;
            }
            .swiper-button-prev{// 上一张按钮
              left: 0;
              background-position:  -84px 0;
              &:hover{
                background-position:  0px 0;
              }
            }
            .swiper-button-next{// 下一张按钮
              // left: none !important;
              right: 0px;
              background-position:  -126px 0;
              &:hover{
                background-position:  -42px 0;
              }
            }
            .swiper-pagination{
              .swiper-pagination-bullet{
                width: 50px;
                height: 3px;
                background-color: #ccc;
                border: none;
                border-radius: 0;
                opacity: 1;
                &.swiper-pagination-bullet-active{
                  background-color: #a3a3a3;
                }
                &:hover{
                  background-color: #a3a3a3;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
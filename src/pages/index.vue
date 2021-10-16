<template>
  <div class="index">
    <!-- 首页上半部分 -->
    <div class="home-hero-container">
      <div class="container">
        <!-- 轮播图与其左侧菜单栏 -->
        <div class="swiper-box">
          <div class="nav-menu"> <!-- 轮播图左侧的菜单 -->
            <ul class="menu-list">
              <li class="menu-item" 
                :class="{'active': currMenuItem===index}" 
                @mouseenter="currMenuItem=index" 
                @mouseleave="currMenuItem=-1"
                v-for="(item, index) in menuList" :key="index"
              > 
                <a class="menu-list-a" href="javascript:void(0);">{{item}}</a>
                <div class="menu-children">
                  <ul class="menu-children-list" v-for="(ulArr,ulIndex) in menuChildrenList[index]" :key="ulIndex">
                    <li class="children-item" v-for="(liItem, LiIndex) in ulArr" :key="LiIndex">
                      <a :href="`/#/product/${liItem.id}`">
                        <img :src="liItem.img" alt="">
                        <span class="text">{{liItem.name}}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>                          
            </ul>
          </div>
          <!-- 因为只有首页index中有轮播图，所以就不抽成组件了 -->
          <swiper class="swiper-no-swiping" ref="mySwiper" :options="swiperOptions">
            <!-- 每一项 -->
            <swiper-slide v-for="(item,index) in swiperList" :key="index">
              <a :href="`/#/product/${item.id}`"><img :src="item.img"></a>
            </swiper-slide>
            <!-- 分页器 -->
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- 上一页，下一页的按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </swiper>
        </div>
        <!-- 轮播图下方的广告位 -->
        <div class="ads-box">
          <ul class='ads-list'>
            <li class="ads-item" v-for="(item,index) in adsList" :key="index">
              <a :href="`/#/product/${item.id}`">
                <!-- <img :src="item.img"  alt=""> -->
                <img v-lazy="item.img"  alt="">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 首页主体部分 -->
    <div class="page-main">
      <div class="container">
        <div class="banner">                     
          <a :href="`/#/product/30`">
            <!-- <img src="/imgs/banner-1.png" alt=""> -->
            <img v-lazy="'/imgs/banner-1.png'" alt="">
          </a>
        </div>
        <div class="product-box">
          <h2 class="title">手机</h2>
          <div class="wrapper">
            <div class="banner-left">
              <a href="/#/product/35">
                <!-- <img src="/imgs/mix-alpha.jpg" alt=""> -->
                <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
              </a>
            </div>
            <div class="banner-right">
              <ul class="product-list">
                <li class="product-item" v-for="(item, index) in phoneList" :key="index">
                  <a :href="`/#/product/${item.id}`">
                    <div class="item-img">
                      <!-- <img :src="item.mainImage" alt=""> -->
                      <img v-lazy="item.mainImage" alt="">
                    </div>
                    <h3 class="name">{{item.name}}</h3>
                    <p class="desc">{{item.subtitle}}</p>
                    <p class="price" @click.stop.prevent="addCart(item.id)">{{item.price}}元起</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 首页靠后部分的，服务选项栏 -->
    <service-bar></service-bar>
    <!-- 模态框组件 -->
    <modal 
      modalType="middle" 
      title="提示"
      btnType="1" 
      sureText="查看购物车"
      :showModal="showModal"
      @submit="goToCart"
      @cancel="showModal = false"
      >
      <template #body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ServiceBar from '../components/ServiceBar.vue'
import Modal from '../components/Modal.vue'
export default {
  name: 'index',
  components:{
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  data() {
    return {
      // 轮播数据是静态的
      swiperList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-5.jpg'
        },
      ],
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
      // 左侧菜单列表数据，静态的
      menuList:[
        '手机 电话卡','电视 盒子','笔记本 平板','家电 插线板','出行 穿戴','智能 路由器','电源 配件','生活 箱包'
      ],
      currMenuItem: -1,// 当前移入的左侧菜单的索引
      menuChildrenList:[// 轮播图左侧菜单的子选项列表，也是静态的
        // 1.手机 电话卡
        [
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],               
        ],
        // 2.电视 盒子
        [
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            }
          ],            
        ],
        // 3.笔记本 平板
        [
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            }
          ], 
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            }
          ],          
        ],
        // 4.
        [
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            }
          ],            
        ],
        // 5.
        [
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ]          
        ],
        // 6.
        [
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            }
          ],
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            }
          ],             
        ],
        // 7.
        [
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },
          ]           
        ],
        // 8.
        [
          [
            {
              id: 30,
              img: '/imgs/item-box-1.png',
              name: '小米CC9'
            },{
              id: 31,
              img: '/imgs/item-box-2.png',
              name: '小米8青春版'
            },{
              id: 32,
              img: '/imgs/item-box-3.jpg',
              name: 'Redmi K20 Pro'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            },{
              id: 33,
              img: '/imgs/item-box-4.jpg',
              name: '移动4G专区'
            }
          ],         
        ],
      ],
      //轮播图下方广告位的数据，静态的(什么他妈都是静态的，这个课程还好意思卖398)
      adsList:[
        {
          id: 33,// 广告产品id
          img: '/imgs/ads/ads-1.png'
        },
        {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        },
        {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList:[], // 首页中，手机分类的数据，后台请求获取
      showModal: false// 模态框是否显示
    }
  },
  computed: {
    swiper(){
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    pauseOnMouseEnter(){// swiper的移入暂停播放
      this.swiper.el.onmouseover = function(){
        this.swiper.autoplay.stop();
      }
      this.swiper.el.onmouseout = function(){
        this.swiper.autoplay.start();
      }
    },
    getPhoneList(){
      this.axios.get('/products',{
        params:{
          categoryId: '100012',
          pageSize: 14 //通过get参数让后端只返回6条数据，也可以前端自己截取
        }
      }).then((res)=>{
        this.phoneList = res.list.slice(6,14)// 因为后台接口缘故，返回0~5的数据的图片的尺寸有误，所以需要拿6~14的数据
      }).catch((error)=>{
        console.log(error);
      })
    },
    addCart(id){// 通过单击分类中的价格栏快捷添加到购物车
      // console.log(id);
      // this.showModal = true
      this.axios.post('/carts',{
        productId: id,
        selected: true 
      }).then((res)=>{
        this.showModal = true
        console.log(res);
      }).catch((error)=>{
        console.log(error);
      })
    },
    goToCart(){
      this.$router.push('/cart')
    }
  },
  mounted(){
    this.pauseOnMouseEnter() // 使得鼠标mouseover轮播图停止轮播
    this.getPhoneList()// 后台请求手机分类的8个数据
  }
}
</script>
<style lang="scss">
  @import '../assets/scss/base.scss';
  @import '../assets/scss/mixin.scss';
  .index{
    .home-hero-container{
      .container{
        .swiper-box{
          position: relative;
          .swiper-container{// 轮播图2
            .swiper-slide{
              a{
                display: inline-block;
                img{
                  width: 1226px;
                  vertical-align: bottom;
                }
              }
            }
            .swiper-button-prev,.swiper-button-next{
              width: 41px;
              height: 69px;
              background: url('https://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png') no-repeat;
            }
            .swiper-button-prev{// 上一张按钮
              left: 234px;
              background-position:  -84px 0;
              &:hover{
                background-position:  0px 0;
              }
            }
            .swiper-button-next{// 下一张按钮
              left: none !important;
              right: 0px;
              background-position:  -126px 0;
              &:hover{
                background-position:  -42px 0;
              }
            }
            .swiper-pagination{// 分页器
              width: 400px;
              left: auto;
              right: 30px;
              bottom: 20px;
              text-align: right;
              line-height: 20px;
              .swiper-pagination-bullet{// 分页器小点
                width: 6px;
                height: 6px;
                border: 2px solid #fff;
                border-color: hsla(0,0%,100%,.3);
                background-color:rgba(0,0,0,.4);
                opacity: 1;
                &.swiper-pagination-bullet-active{
                  border-color:rgba(0,0,0,.4);
                  background-color: hsla(0,0%,100%,.4);
                }
                &:hover{
                  border-color:rgba(0,0,0,.4);
                  background-color: hsla(0,0%,100%,.4);
                }
              }
            }
          }
          .nav-menu{// 左侧选项菜单列表
            position: absolute;
            z-index: 2;
            width: 234px;
            height: 460px;
            .menu-list{
              display: flex;
              flex-direction: column;
              font-size: 14px;
              padding: 20px 0;
              height: 100%;
              box-sizing: border-box;
              background-color: rgba(105, 101, 101, 0.6);
              .menu-item{
                flex: 1;
                a.menu-list-a{
                  position: relative;
                  padding-left: 30px;
                  display: flex;
                  align-items: center;
                  height: 100%;
                  color: #fff;
                  &:hover{
                    background-color: #ff6700;
                  }
                  &::after{
                    position: absolute;
                    right: 25px;
                    content: '';
                    @include bgImg(10px,15px,'/imgs/icon-arrow.png');
                  }
                }
                .menu-children{
                  display: none;
                  position: absolute;
                  z-index: 12;
                  // width: 992px; 
                  height: 458px;// 高度固定
                  top: 0;
                  left: 234px;
                  border: 1px solid #e0e0e0;
                  border-left: none;
                  background-color: #fff;
                  box-shadow: 0 8px 16px rgba(0,0,0,0.18);
                  .menu-children-list{ // 最多4列ul
                    width: 248px;
                    padding: 1px 0;
                    .children-item{ // 每列ul有最多6行li
                      display: flex;
                      flex-direction: column;
                      a{// li中的a
                        display: inline-block;
                        width: 265px;
                        height: 76px;
                        padding: 18px 20px;
                        box-sizing: border-box;
                        line-height: 40px;
                        color: #333;
                        img{
                          width: 40px;
                          height: 40px;
                          vertical-align: middle;
                          margin-right: 12px;
                        }
                        .text{
                          display: inline-block;
                        }
                        &:hover{
                          color: #ff6700;
                        }
                      }
                    }
                  }
                }
                &.active{
                  .menu-children{
                    display: flex
                  }
                }
              }
            }
          }
        }
        .ads-box{
          margin-top: 14px;
          .ads-list{
            display: flex;
            justify-content: space-between;
            .ads-item{
              a{
                display: inline-block;
                img{
                  height: 167px;
                  width: 296px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
    .page-main{
      background-color: #f5f5f5;
      margin-top: 31px;
      .container{
        .banner{
          margin-bottom: 22px;
          a{
            display: inline-block;
            img{
              width: 1226px;
              height: 130px;
              vertical-align: middle;
            }
          }
        }
        .product-box{
          .title{
            height: 57px;
            line-height: 57px;
            font-size: 22px;
            color: rgb(51, 51, 51);
            font-weight: 200;
          }
          .wrapper{
            display: flex;
            .banner-left{
              a{
                display: inline-block;
                img{
                  vertical-align: middle;
                  width: 234px;
                  height: 614px;
                }
              }
            }
            .banner-right{
              width: 992px;
              padding-left: 14px;
              box-sizing: border-box;
              .product-list{
                display: flex;
                height: 100%;
                flex-wrap: wrap;
                justify-content: space-between;
                align-content: space-between;
                .product-item{
                  width: 234px;
                  height: 300px;
                  padding: 20px 0;
                  box-sizing: border-box;
                  background-color: #fff;
                  transition: all 0.2s;
                  a{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .item-img{
                      margin-bottom: 18px;
                      img{
                        height: 160px;
                        vertical-align: middle;
                      }
                    }
                    .name{
                      margin-bottom: 2px;
                      font-size: 14px;
                      font-weight: 400;
                      color: #333;
                      line-height: 20px;
                    }
                    .desc{
                      width: 234px;
                      margin-bottom: 10px;
                      font-size: 12px;
                      color: #b0b0b0;
                      height: 18px;
                      line-height: 18px;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      text-align: center;
                      overflow: hidden;
                    }
                    .price{
                      display: flex;
                      align-items: center;
                      font-size: 14px;
                      color: #ff6700;
                      // line-height: 20px;
                      &::after{
                        content:'';
                        margin-left: 10px;
                        @include bgImg(22px,22px,'/imgs/icon-cart-hover.png')
                      }
                    }
                  }
                  &:hover{
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.18);
                  }
                }
                
              }
            }
          }
        }
      }
    }
  }
</style>
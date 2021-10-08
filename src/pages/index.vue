<template>
  <div class="index">
    <div class="container">
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
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </swiper>
      </div>
      <div class="ads-box"></div>
      <div class="banner"></div>
      <div class="product-box"></div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ServiceBar from '../components/ServiceBar.vue'
export default {
  name: 'index',
  components:{
    swiper,
    swiperSlide,
    ServiceBar,
  },
  data() {
    return {
      // 轮播数据是静态的，不请求
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
    }
  },
  mounted(){
    this.pauseOnMouseEnter() // 使得鼠标mouseover轮播图停止轮播
  }
}
</script>
<style lang="scss">
  @import '../assets/scss/base.scss';
  @import '../assets/scss/mixin.scss';
  .index{
    .container{
      .swiper-box{
        position: relative;
        .swiper-container{// 轮播图2
          .swiper-slide{
            img{
              width: 1226px;
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
    }
  }
</style>
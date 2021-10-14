<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="/#/index">小米商城</a>
          <span class="sep">|</span>
          <a href="https://home.miui.com/" target="_blank">MIUI</a>
          <span class="sep">|</span>
          <a href="https://iot.mi.com/"  target="_blank">loT</a>
          <span class="sep">|</span>
          <a href="https://i.mi.com/" target="_blank">云服务</a>
          <span class="sep">|</span>
          <a href="https://www.mi.com/aptitude/list" target="_blank">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-else @click="login()">登录</a>
          <span class="sep">|</span>
          <a href="javascript:;">我的订单</a>
          <span class="sep">|</span>
          <a href="javascript:;" class="my-cart" @click="goToCart()">
            <span class="icon-cart"></span>
            购物车({{cartCount}})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index" title="小米官网">小米官网</a>
        </div>
        <div class="header-menu">
          <div class="item-menu" :class="{'isActive':itemMenuIndex === 0}" @mouseenter="slideDown($event,0)" @mouseleave="slideUp($event)">
            <a class="item-menu-a" href="javascript: void(0);">
              <span>小米手机</span>
            </a>
            <div class="children">
              <ul class="product-list">
                <li class="product" v-for="(item, index) in phoneList" :key="index" >
                  <a :href="`/#/product/${item.id}`" target="_blank">
                    <div class="pro-img">
                      <img :src="item.mainImage" alt="">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}起</div>
                  </a>
                </li>                                     
              </ul>
            </div>
          </div>
          <div class="item-menu" :class="{'isActive':itemMenuIndex === 1}" @mouseenter="slideDown($event,1)" @mouseleave="slideUp($event)">
            <a class="item-menu-a" href="javascript: void(0);">
              <span>Redmi红米</span>
            </a>
            <div class="children">
              <ul class="product-list">
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e3c5d99c28700a3c45ea65eebbea0a04.png?thumb=1&w=160&h=110&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">Redmi Note 10 Pro</div>
                    <div class="pro-price">1599元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/88bb84ff06f0ab467b859aeed36b817a.png?thumb=1&w=160&h=110&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">Redmi Note 10 5G</div>
                    <div class="pro-price">1099元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&w=160&h=110&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d07671f25a2b3a6c3d4fac189f28fbe9.png?thumb=1&w=160&h=110&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">K40 Pro 系列</div>
                    <div class="pro-price">2499元起</div>
                  </a>
                </li>      
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ecebd50c7840bb03d7b5e3bfe4d439c2.png?thumb=1&w=160&h=110&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">Redmi K40</div>
                    <div class="pro-price">1999元起</div>
                  </a>
                </li>   
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/584add2c9cfdb9eefe7b642bf191773a.png?thumb=1&w=160&h=110&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">Redmi Note 9 4G</div>
                    <div class="pro-price">899元起</div>
                  </a>
                </li>                                       
              </ul>
            </div>
          </div>
          <div class="item-menu" :class="{'isActive':itemMenuIndex === 2}" @mouseenter="slideDown($event,2)" @mouseleave="slideUp($event)">
            <a class="item-menu-a" href="javascript: void(0);">
              <span>电视</span>
            </a>
            <div class="children">
              <ul class="product-list">
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-1.jpg" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-2.jpg" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">19999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-3.png" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-4.jpg" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799起</div>
                  </a>
                </li>      
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-5.jpg" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699起</div>
                  </a>
                </li>   
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-6.png" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>                                       
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
      <transition enter-class="slide-up" leave-to-class="slide-up"  enter-to-class="slide-down" leave-class="slide-down">
        <div class="header-menu-children" 
          ref="headerChildren"
          v-show="isShow"
          @mouseleave="slideUp"
        >
          <!-- 这里面是header-menu上滑动选中的结构 -->
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'nav-header',
  data() {
    return {
      phoneList: [], //后台请求数据获得的,只有小米手机的数据，红米和电视的数据是静态的
      isShow: false,
      itemMenuIndex : -1
    }
  },
  computed:{
    // username(){
    //   return this.$store.state.username
    // },
    // cartCount(){
    //   return this.$store.state.cartCount
    // }
    ...mapState(['username','cartCount'])
  },
  methods: {
    login(){
      this.$router.push('/login')
    },
    getPhoneList(){
      this.axios.get('/products',{
        params:{
          categoryId: '100012',
          pageSize: 6 //通过get参数让后端只返回6条数据，也可以前端自己截取
        }
      }).then((res)=>{
        if(res.list.length == 6){
          this.phoneList = res.list.slice(0,6)
        }else{
          this.phoneList = res.list
        }
      }).catch((error)=>{
        console.log(error);
      })
    },
    goToCart(){
      this.$router.push('/cart')
    },
    slideUp(e){
      if(!e.toElement) {// 为null说明，移除窗口了
        this.isShow = false
        this.itemMenuIndex = -1
        return 
      }
      let classList = e.toElement.classList
      if(classList.contains('product-list') || classList.contains('item-menu') || classList.contains('item-menu-a')){
        // 这说明是鼠标移动到了下滑children列表中或者，移动到了别的item中，那么下滑列表就不需要隐藏
        return 
      }else{
        this.isShow = false
        this.itemMenuIndex = -1
      }
    },
    slideDown(e,index){
      let content = e.target.getElementsByClassName('children')[0].innerHTML
      let headerChildren = this.$refs.headerChildren
      headerChildren.innerHTML = content
      this.isShow = true
      this.itemMenuIndex = index
    }
  },
  mounted() {
    this.getPhoneList() //获取手机列表
  },
  filters: {
    currency(val){
      if(!val) return '0.00'
      return '￥'+val.toFixed(2) + '元'
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/scss/base.scss';
  @import '../assets/scss/mixin.scss';
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background-color: #333;
      color: #B0B0B0;
      .container{
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        @include flex();// 使用flex混合
        a{
          display: inline-block;
          color: #B0B0B0;
          &:hover{
            color: #fff
          }
        }
        .sep{
          margin: 0.4em;
          color: #424242;
        }
        .topbar-user{
          .my-cart{
            width: 110px;
            background-color: #666;
            text-align: center;
            .icon-cart{
              // display: inline-block;
              // width: 16px;
              // height: 12px;
              // background-image: url('/imgs/icon-cart.png');
              // background-size: 100%;
              @include bgImg(16px,12px,'/imgs/icon-cart.png');// 专门设置背景图片的混合
            }
          }
        }
      }
    }
    .nav-header{
      position: relative;
      .container{
        height: 100px;
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        @include flex();// 使用flex混合
        .header-logo{
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
              // display: inline-block;
              // width: 55px;
              // height: 55px;
              // background: url('/imgs/mi-logo.png') no-repeat center;
              // background-size: contain;
              @include bgImg(55px,55px,'/imgs/mi-logo.png');// 专门设置背景图片的混合
            }
            &::after{
              content: '';
              // display: inline-block;
              // width: 55px;
              // height: 55px;
              // background: url('/imgs/mi-home.png') no-repeat center;
              // background-size: contain;
              @include bgImg(55px,55px,'/imgs/mi-home.png');// 专门设置背景图片的混合
            }
            &:hover{
              margin-left: -55px;
            }
          }
        }
        .header-menu{
          flex: 1;
          display: flex;
          padding-left: 162px;
          .item-menu{
            position: relative;
            color: #333;
            font-size: 16px;
            .item-menu-a{
              display: inline-block;
              color: #333;
              line-height: 24px;
              padding: 38px 10px 38px 10px;
              span{
                cursor: pointer;
              }
            }
            .children{
              display: none;
              height: 0;
              overflow: hidden;
              position: absolute;
              top: 100px;
              left: 0;
              width: 100%;
              z-index: 10;
              background-color: #fff;
              transition: height 0.3s;
              box-shadow: 0 3px 4px 0px rgba(0, 0, 0, 0.18);
              .product-list{
                display: flex;
                margin: 0 auto;
                justify-content: flex-start;
                align-items: center;
                height: 100%;
                width: 1226px;
                .product{
                  position: relative;
                  width: 204px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  text-align: center;
                  font-size: 12px;
                  line-height: 20px;
                  &::before{
                    position: absolute;
                    left: 0;
                    display: inline-block;
                    content: '';
                    width: 1px;
                    height: 100px;
                    background-color: #e0e0e0;
                  }
                  &:nth-of-type(1):before{//第一个product不要横线
                    display: none;
                  }
                  .pro-img{
                    margin-bottom: 16px;
                    img{
                      height: 110px;
                      vertical-align: middle;
                    }
                  }
                  .pro-name{
                    color: #333;
                  }
                  .pro-price{
                    color: #FF6600;
                  }
                }
              }
            }
            &.isActive{
              .item-menu-a{
                color:#FF6600;
              }
              &::after{
                content: '';
                position: absolute;
                bottom: 0;
                /* 
                  超经典【子元素宽度大于父元素时】
                  居中布局，且父元素宽度不是固定的值
                  left: 50%;
                  margin-left: -300px; 
                  或者 
                  margin-right: -300px;
                  right: 50%;
                */
                left: 50%;
                margin-left: -300px;
                z-index: 11;
                display: inline-block;
                width: 600px;
                height: 40px;
                // background-color: skyblue;
              }
            }
          }
        }
        .header-search{
          width: 296px;
          .wrapper{
            // display: flex;
            // align-items: center;
            @include flex(flex-start);// flex混合
            height: 50px;
            box-sizing: border-box;
            border: 1px solid #e0e0e0;
            transition: all 0.2s;
            input{
              border: none;
              outline: none;
              border-right: 1px solid #e0e0e0;
              transition: all 0.2s;
              width: 223px;
              height: 48px;
              padding: 0 10px;
            }
            a{
              // display: inline-block;
              // height: 48px;
              // width: 50px;
              // flex: 1;
              // box-sizing: border-box;
              // background: url('/imgs/icon-search.png') no-repeat center;
              // background-size: 18px;
              @include bgImg(50px,48px,'/imgs/icon-search.png',18px);// 专门设置背景图片的混合
            }
            &:hover{
              border: 1px solid #b0b0b0;
              input{
                border-right: 1px solid #b0b0b0;
              }
            }
          }
        }
      }
      .header-menu-children{// mouseenter时
        &.slide-down{
          height: 229px;
        }
        &.slide-up{
          height: 0;
        }
        height: 229px;
        overflow: hidden;
        position: absolute;
        top: 100px;
        left: 0;
        width: 100%;
        z-index: 10;
        background-color: #fff;
        border-top: 1px solid rgb(224, 224, 224);
        transition: all 0.3s;
        box-shadow: 0 3px 4px 0px rgba(0, 0, 0, 0.18);
        .product-list{
          display: flex;
          margin: 0 auto;
          justify-content: flex-start;
          align-items: center;
          height: 100%;
          width: 1226px;
          .product{
            position: relative;
            width: 204px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: 12px;
            line-height: 20px;
            &::before{
              position: absolute;
              left: 0;
              display: inline-block;
              content: '';
              width: 1px;
              height: 100px;
              background-color: #e0e0e0;
            }
            &:nth-of-type(1):before{//第一个product不要横线
              display: none;
            }
            .pro-img{
              margin-bottom: 16px;
              img{
                height: 110px;
                vertical-align: middle;
              }
            }
            .pro-name{
              color: #333;
            }
            .pro-price{
              color: #FF6600;
            }
          }
        }
      }
    }
  }
</style>
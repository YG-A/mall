<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template #tips>
        <p class="tips">{{tip}}</p>
      </template>
    </order-header>
    <div class="cart-main">
      <!-- 购物车中没有商品时 -->
      <div class="no-products container" v-if="cartTotalQuantity === 0">
        啥也没有，先去选购吧！！！
      </div>
      <!-- 购物车中有商品时 -->
      <div class="be-products container" v-else>
        <div class="cart-goods-list">
          <!-- 购物车选项栏的头部 -->
          <div class="list-header">
            <div class='col-check'>
              <span class="icon-checkbox" :class="{'active':allChecked}" @click="toggleAll"></span>
              全选
            </div>
            <div class='col-img'>&nbsp;</div>
            <div class='col-name'>商品名称</div>
            <div class='col-price'>单价</div>
            <div class='col-num'>数量</div>
            <div class='col-total'>小计</div>
            <div class='col-action'>操作</div>
          </div>
          <!-- 购物车的商品列表 -->
          <div class="list-body">
            <div class="list-item" v-for="(item,index) in goodsList" :key="index">
              <div class='col-check'>
                <span class="icon-checkbox" :class="{'active':item.productSelected}" @click="updateCart(item,'select')"></span>
              </div>
              <div class='col-img'>
                <img v-lazy="`${item.productMainImage}`" alt="">
              </div>
              <div class='col-name'>{{item.productName}}</div>
              <div class='col-price'>{{item.productPrice}}元</div>
              <div class='col-num'>
                <div class="change-goods-num">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <input type="text" v-model.number.lazy="item.quantity" @focus="currentProductNum = item.quantity" @blur="updateCart(item,'num')">
                  <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class='col-total'>{{item.productTotalPrice}}元</div>
              <div class='col-action'>
                <a class="del-icon" href="javascript:;" @click="showModalAndDel(item)"></a>
              </div>
            </div>
          </div>
        </div>
        <!-- 购物车尾部结算 -->
        <div class="list-footer">
          <div class="footer-left">
            <a href="/#/index">继续购物</a>
            <span class="sep">|</span>
            <div class="cart-info">
              共 <span class="total-num">{{cartTotalQuantity}}</span> 件商品，已选择
              <span class="selected-num">{{checkedNum}}</span> 件
            </div>
          </div>
          <div class="footer-right">
            <div class="total-price">
              合计：<span class="selected-price">{{cartTotalPrice}}</span>元
            </div>
            <div class="settle-account btn btn-default btn-large" v-if="checkedNum === 0">
              请勾选结算的商品
            </div>
            <div class="settle-account btn btn-large" @click="order" v-else>
              去结算
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
    
    <!-- 删除商品提示，模态框组件 -->
    <modal 
      modalType="middle" 
      title="提示"
      btnType="3" 
      sureText="确定"
      cancelText="取消"
      :showModal="showModalByDel"
      @submit="delProduct"
      @cancel="showModalByDel = false"
      >
      <template #body>
        <p>确定要删除该商品吗？</p>
      </template>
    </modal>

    <!-- 商品数量提示，模态框组件 -->
    <modal 
      modalType="middle" 
      title="提示"
      btnType="1" 
      sureText="确定"
      cancelText="取消"
      :showModal="showModalByNum"
      @submit="showModalByNum = false"
      @cancel="showModalByNum = false"
      >
      <template #body>
        <p>{{modalTipsByNum}}</p>
      </template>
    </modal>

  </div>
</template>
<script>
import OrderHeader from '../components/OrderHeader.vue'
import NavFooter from '../components/NavFooter.vue'
import ServiceBar from '../components/ServiceBar.vue'
import Modal from '../components/Modal.vue'
export default {
  name: 'cart',
  components: {
    OrderHeader,NavFooter,ServiceBar,Modal
  },
  data(){
    return{
      tip: '温馨提示: 产品是否购买成功，以最终下单为准哦，请尽快结算',
      goodsList: [],//商品
      allChecked: false,//是否全选
      cartTotalPrice: 0,//商品总金额
      cartTotalQuantity: 0,//商品总件数
      checkedNum: 0, //选中的商品件数
      showModalByDel: false,// 删除商品，模态框是否显示
      showModalByNum: false, // 商品数量改变，模态框是否显示
      modalTipsByNum: '',// 商品数量改变，模态框的提示信息
      modelRes: false, // 模态框的确认或取消
      currentItem: {}, // 当前操作的那个商品item
      currentProductNum: 0,// 保存商品修改前的值，方便输入非法数量后，能够恢复原先选中的数量
    }
  },
  mounted() {  
    this.getCartList()
  },
  methods: {
    // 收集数据的方法
    saveData(res){
      this.goodsList = res.cartProductVoList || []
      this.allChecked = res.selectedAll
      this.cartTotalPrice = res.cartTotalPrice
      this.cartTotalQuantity = res.cartTotalQuantity
      let tempArr = this.goodsList.filter((item)=>{
      if(item.productSelected){// 如果该项商品是选中的
          return true
        }
      })
      this.checkedNum = 0
      tempArr.forEach((item)=>{
        this.checkedNum += item.quantity
      })
    },
    // 获取购物车商品列表
    getCartList(){  
      this.axios.get('/carts').then((res)=>{
        this.saveData(res)
      }).catch((error)=>{
        console.log(error);
      })
    },
    // 修改全选/非全选状态
    toggleAll(){
      let url = this.allChecked? '/carts/unSelectAll':'/carts/selectAll'
      this.axios.put(url).then((res)=>{
        this.saveData(res)
      }).catch((error)=>{
        console.log(error);
      })
    },
    // 单个商品的更新操作(商品数量增加、商品数量减少、商品选中或取消勾选)
    updateCart(item,type){
      // let productStock = item.productStock // 该商品的库存
      let productStock = 20 // 该商品的库存
      let quantity = item.quantity// 商品的数量
      let selected = item.productSelected
      if(type === '-'){
        if(quantity === 1){
          this.modalTipsByNum = '商品至少保留一件'// 模态框提示信息
          this.showModalByNum = true// 商品数量模态框
          return 
        }
        quantity--
      }else if(type === '+'){
        if(quantity >= productStock){
          this.modalTipsByNum = '商品不能超出最大购买量'// 模态框提示信息
          this.showModalByNum = true// 商品数量模态框
          return 
        }
        quantity++
      }else if(type === 'select'){
        // 选中状态取反
        selected = !item.productSelected  
      }else if(type === 'num'){
        if(typeof quantity === 'number'){
          if(quantity < 1){
            this.modalTipsByNum = '商品至少保留一件'// 模态框提示信息
            this.showModalByNum = true// 商品数量模态框
            item.quantity = this.currentProductNum
            return 
          }else if(quantity > productStock){
            this.modalTipsByNum = '商品不能超出最大购买量'// 模态框提示信息
            this.showModalByNum = true// 商品数量模态框
            item.quantity = this.currentProductNum
            return 
          }
        }else{
          this.modalTipsByNum = '请输入合法的数字'// 模态框提示信息
          this.showModalByNum = true// 商品数量模态框
          item.quantity = this.currentProductNum
          return 
        }
      }
      this.axios.put(`/carts/${item.productId}`,{
        quantity,
        selected
      }).then((res)=>{
        this.saveData(res)
      }).catch((error)=>{
        console.log(error);
      })
    },
    // 显示模态框
    showModalAndDel(item){
      this.currentItem = item
      this.showModalByDel = true// 显示模态框
    },
    // 删除某个产品
    delProduct(){
      let item = this.currentItem
      this.modelRes = false // 将模态框返回值置为原始值
      this.axios.delete(`/carts/${item.productId}`)
      .then((res)=>{
        this.saveData(res)
      }).catch((error)=>{
        console.log(error);
      })
      this.showModalByDel = false// 隐藏模态框
    },
    // 结算订单
    order(){
      this.$router.push('/order/confirm')
    }

  }
}
</script>
<style lang="scss">
  .cart{
    .cart-main{
      min-height: 423px;
      border-top: 1px solid #FF6700;
      padding: 38px 0;
      background-color: #f5f5f5;
      .no-products{
        font-size: 30px;
      }
      .be-products{
        .cart-goods-list{
          background-color: #fff;
          font-size: 14px;
          color: #424242;
          .list-header{
            height: 70px;
            display: flex;
            line-height: 70px;
          }
          .list-body{
            .list-item{
              display: flex;
              align-items: center;
              border-top: 1px solid #e0e0e0;
              height: 116.25px;
            }
          }
          .col-check{
            width: 110px;
            .icon-checkbox{
              position: relative;
              top: -1px;
              display: inline-block;
              vertical-align: middle;
              width: 18px;
              height: 18px;
              border: 1px solid #e0e0e0;
              margin: 0 15px 0 24px;
              cursor: pointer;
              &.active{
                background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
                background-size:16px 12px;
                border-color: #FF6600;
              }
            }
          }
          .col-img{
            width: 120px;
            img{
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
          }
          .col-name{
            width: 380px;
          }
          .col-price{
            text-align: center;
            width: 140px;
            padding-right: 18px;
          }
          .col-num{
            text-align: center;
            width: 150px;
            .change-goods-num{
              display: flex;
              width: 148px;
              height: 38px;
              line-height: 38px;
              border: 1px solid #e0e0e0;
              a{
                display: inline-block;
                width: 38px;
                height: 38px;
                font-size: 20px;
                color: #000;
                &:hover{
                  background-color: #e0e0e0;
                }
              }
              input{
                width: 72px;
                height: 38px;
                border: none;
                outline: none;
                text-align: center;
                font-size: 16px;
              }
            }
          }
          .col-total{
            text-align: right;
            width: 120px;
            padding-right: 81px;
          }
          .col-action{
            width: 80px;
            text-align: center;
            .del-icon{
              display: inline-block;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size: 14px 12px;
              transition: all 0.3s;
              &:hover{
                background-color: red;
              }
            }
          }
        }
        .list-footer{
          background: #fff;
          margin-top: 30px;
          height: 50px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          .footer-left{
            display: flex;
            line-height: 50px;
            a{
              color: #757575;
              margin-left: 32px;
              transition: all 0.3s;
              &:hover{
                color: #ff6700;
              }
            }
            .sep{
              margin: 0 16px;
              color: #e0e0e0;
            }
            .cart-info{
              .total-num{
                color: #ff6700;
              }
              .selected-num{
                color: #ff6700;
              }
            }
          }
          .footer-right{
            display: flex;
            .total-price{
              line-height: 45px;
              color: #ff6700;
              .selected-price{
                font-size: 30px;
              }
            }
            .settle-account{
              margin-left: 50px;
            }
          }
        }
      }
    }
  }
</style>
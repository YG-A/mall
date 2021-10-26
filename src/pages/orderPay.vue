<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分钟</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total"> 
              <p>应付总额：<span>{{payment}}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up':!showDetail}" @click="showDetail = !showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-show="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage"/>{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked': payType === 1}" @click="alipay(1)"></div>
            <div class="pay pay-wechat" :class="{'checked': payType === 2}" @click="alipay(2)"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 微信二维码模态框 -->
    <scan-pay-code :img='payImg' v-if="showPay" @close='closePayModal'></scan-pay-code>

    <!-- 模态框 -->
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="已支付，查看订单"
      cancelText="未支付"
      @cancel='showPayModal = false'
      @submit="goOrderList"
    >
      <template #body> 
        <p>订单是否支付完成？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import QRCode from 'qrcode'
import ScanPayCode from '../components/ScanPayCode'
import Modal from '../components/Modal.vue'
export default {
  order: 'order-pay',
  components: {
    ScanPayCode,
    Modal
  },
  data() {
    return {
      orderNo: this.$route.query.orderNo,//从订单确认页面过来的query参数订单号
      addressInfo: '',//该订单的地址信息
      orderDetail: [], //该订单中所含商品列表
      payment: '', // 应付金额
      showDetail: false,
      payType: '',
      showPay: false,
      payImg: '',
      showPayModal: false, //是否显示二次支付确认弹框
      timeId: null// 轮询订单支付状态的定时器
    }
  },
  methods: {
    // 获取订单信息
    getOrderDetail(){
      this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
        let item = res.shippingVo
        // 订单的地址
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`
        // 该订单中所含商品列表
        this.orderDetail = res.orderItemVoList//商品数据
        this.payment = res.payment
      }).catch((error)=>{
        console.log(error);
      })
    },
    // 选择微信或支付宝支付
    alipay(payType){
      this.payType = payType
      if(payType === 1){
        // 这个是纯js打打开新页面跳转的方式，参数一就是a标签的href,参数二就是a标签的target
        window.open(`/#/order/alipay/?orderId=${this.orderNo}`,'_blank')
        this.loopOrderState()
      }else{
        this.axios.post('/pay',{
        orderId: this.orderNo,
        orderName: 'Vue高仿小米商城', //扫码支付时订单名称
        amount: 0.01, //单位元
        payType: 2 //1支付宝，2微信
        }).then((res)=>{
          QRCode.toDataURL(res.content)
          .then(url => {
            this.payImg = url// 通过QRCode把链接转成base64字符串
            this.showPay = true// 显示微信二维码
            this.loopOrderState()
          })
          .catch(err => {
            console.error('微信二维码生成失败',err)
          })
        })
      }
    },
    // 关闭微信支付码弹框
    closePayModal(){
      this.showPay = false
      this.showPayModal = true
      clearInterval(this.timeId)
    }, 
    // 支付成功，前往订单列表
    goOrderList(){
      this.$router.replace('/order/list')
    },
    // 轮询当前订单的支付状态
    loopOrderState(){
      this.timeId = setInterval(()=>{
        this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
          // 订单已支付
          if(res.status === 20){
            clearInterval(this.timeId)
            this.goOrderList()
          }
        })
      },1000)
    }
  },
  mounted() {
    this.getOrderDetail()
  },
}
</script>
<style lang="scss">
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
            .icon-up{
              transform: rotate(180deg);
            }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>
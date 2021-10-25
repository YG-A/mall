<template>
  <div class="order-confirm">
    <!-- svg的图标 -->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z" class="path1"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path>
          <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path>
          <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path>
          <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path>
        </symbol>
      </defs>
    </svg>

    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <!-- 循环渲染 地址信息 -->
              <div class="addr-info" :class="{'checked':index === checkIndex}" @click="checkIndex = index" v-for="(item,index) in list" :key="index">
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverPhone || item.receiverMobile}}</div>
                <div class="street">{{`${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`}}</div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                  </a>
                  <a href="javascript:;" class="fr" @click="editAddressModal(item)"> 
                    <svg class="icon icon-edit"><use xlink:href="#icon-edit"></use></svg>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="openAddressModal">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item,index) in cartList" :key="index"> 
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt="">
                  <span>{{item.productName}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{checkedNum}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除地址时的模态框 -->
    <modal
      title = '删除确认'
      btnType = '1'
      :showModal="showDelModal"
      @cancel='closeModal'
      @submit='submitAddress'
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>

    <!-- 新增或编辑地址时的模态框 -->
    <modal
      title = '编辑地址'
      btnType = '1'
      :showModal="showEditModal"
      @cancel='closeModal'
      @submit='submitAddress'
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkedAddress.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkedAddress.receiverMobile">
          </div>
          <div class="item">
            <!-- 省或直辖市 -->
            <el-select v-model="userAddress.province" filterable placeholder="请选择">
              <el-option
                v-for="(item,index) in addressInfo"
                :key="item.code"
                :label="item.name"
                :value="item.name"
                @click.native="provinceIndex = index"
              >
              </el-option>
            </el-select>

            <!-- 市 -->
            <el-select v-if="userAddress.province" filterable v-model="userAddress.city" placeholder="请选择">
              <el-option
                v-for="(item,index) in cityInfo"
                :key="item.code"
                :label="item.name"
                :value="item.name"
                @click.native="cityIndex = index"
              >
              </el-option>
            </el-select>

            <!-- 区 -->
            <el-select v-if="userAddress.city" filterable v-model="userAddress.district" placeholder="请选择">
              <el-option
                v-for="(item,index) in districtInfo"
                :key="item.code"
                :label="item.name"
                :value="item.name"
                @change="districtIndex = index"
              >
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <textarea name="street" id="" placeholder="详细地址" v-model="checkedAddress.receiverAddress"></textarea> 
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkedAddress.receiverZip">
          </div>
        </div>
      </template>
    </modal>

  </div>
</template>
<script>
import Modal from '../components/Modal.vue'
import addressInfo from '../assets/json/address.json'
export default {
  name: 'order-confirm',
  components:{
    Modal
  },
  data() {
    return {
      list: [],// 收货地址列表
      cartList: [],// 购物车选中结算的商品列表
      cartTotalPrice: 0,// 总价格
      checkedNum: 0,//选中的商品的数量 
      checkedAddress: {},// 要删除的地址对象
      userAction: '',// 用户行为，0:表示新增、1：表示编辑，2：表示删除
      showDelModal: false,// 删除地址时的模态框
      showEditModal: false,// 新增或编辑地址时的模态框
      addressInfo: addressInfo.address,
      provinceIndex: -1,//选择的省的索引，初始值为-1
      cityIndex: 0,//选择的市的索引，初始值为0
      districtIndex: 0,//选择的市的索引，初始值为0
      province: '',// 省
      city: '',// 市
      district: '',//区
      userAddress:{
        province: '',// 省
        city: '',// 市
        district: ''//区
      },
      modifyIndex: 0,// 0表示通过下拉框选择而修改的索引，1表示编辑按钮时赋值修改的索引，这时不要去默认给第一个市和第一个区
      checkIndex: 0// 当前收货地址选中的索引
    }
  },
  computed:{
    cityInfo(){
      return this.provinceIndex !==-1 ? this.addressInfo[this.provinceIndex].children : []
    },
    districtInfo(){
      return this.provinceIndex !==-1 ? this.cityInfo[this.cityIndex].children : []
    }
  },
  watch:{
    // 省级索引改变，则清除市和区的值
    provinceIndex(newVal){
      if(this.modifyIndex === 1) {
        this.modifyIndex = 0
        return
      }
      if(newVal === -1)return 
      let city = this.cityInfo[0]// 默认第一个城市
      this.userAddress.city = city.name
      this.userAddress.district = city.children[0].name
    },
    // 市索引改变则清除区的值
    cityIndex(){
      if(this.modifyIndex === 1) {
        this.modifyIndex = 0
        return
      }
      this.userAddress.district = this.districtInfo[0].name
    }
  },
  mounted() {
    this.getAddressList()
    this.getCartList()
  },
  methods:{
    // 获取用户的地址列表
    getAddressList(){
      this.axios.get('/shippings').then((res)=>{
        this.list = res.list
      }).catch((error)=>{
        console.log(error);
      })
    },
    // 获取结算的购物车商品数据
    getCartList(){
      this.axios.get('/carts').then((res)=>{
        let list = res.cartProductVoList // 购物车所有的商品数据
        this.cartList = list.filter((item)=>{// 过滤出选中的商品
          return item.productSelected
        })
        this.cartList.forEach((item)=>{
          this.checkedNum += item.quantity
        })
        this.cartTotalPrice = res.cartTotalPrice// 购物车中选中的商品的总金额
      }).catch((error)=>{
        console.log(error);
      })
    },
    // 提交订单
    orderSubmit(){
      let item = this.list[this.checkIndex]
      if(!item){
        this.$message.error('请选择一个收货地址')
        return
      }
      this.axios.post('/orders',{
        shippingId: item.id
      }).then((res)=>{
        this.$router.replace({
          path: '/order/pay',
          query: {
            orderNo: res.orderNo
          }
        })
      }).catch((error)=>{
        console.log(error);
      })
    },

    // 请求修改地址，或删除地址
    submitAddress(){
      let {userAction,checkedAddress} = this
      let reqMethod,url,params
      if(userAction === 0){//新增 
        reqMethod = 'post'
        url = `/shippings`
      }else if(userAction === 1){// 编辑(修改)
        reqMethod = 'put'
        url = `/shippings/${checkedAddress.id}`
      }else if(userAction === 2){// 删除
        reqMethod = 'delete'
        url = `/shippings/${checkedAddress.id}`
      }
      if(userAction === 0 || userAction===1){
        /* 
          请继续
        */
        params = {
          receiverProvince: this.userAddress.province,
          receiverCity: this.userAddress.city,
          receiverDistrict: this.userAddress.district,
          ...checkedAddress
        }
        let msg = ''
        if(!params.receiverName){
          msg = '请输入收货人姓名'
        }else if(!/\d{11}/.test(params.receiverMobile)){
          msg = '请输入正确格式的电话号码'
        }else if(!params.receiverProvince){
          msg = '请选择你的省份或直辖市'
        }else if(!params.receiverCity){
          msg = '请选择你地级市'
        }else if(!params.receiverDistrict){
          msg = '请选择你的区/县'
        }else if(!params.receiverAddress){
          msg = '请选择你的详细地址'
        }else if(!/\d{6}/.test(params.receiverZip)){
          msg = '请输入正确格式邮编'
        }
        if(msg){
          this.$message.error(msg)
          return 
        }
      }
      this.axios[reqMethod](url,params).then(()=>{
        // 关闭模态框等一系列清除操作
        this.closeModal()
        // 重新获取地址信息
        this.getAddressList()
        // 提示信息
        this.$message.success('操作成功')
      }).catch((error)=>{
        console.log(error);
      })
    },

    // 关闭删除Modal框，清除操作参数，清除当前操作对象
    closeModal(){
      this.checkedAddress = {}
      this.userAction = ''
      this.showDelModal = false
      this.showEditModal = false
      for (const key in this.userAddress) {// 清空省市区三级联动的v-modal数据
        this.userAddress[key] = ''
      }
      this.provinceIndex = -1// 把三级联动的索引归位
      this.cityIndex = 0// 把三级联动的索引归位
      this.modifyIndex === 0//修改索引的模式归位
    },
    delAddress(item){
      this.checkedAddress = item// 操作的对象
      this.userAction = 2 //操作行为,删除
      this.showDelModal = true// 弹出删除模态框
    },
    
    // 打开新增地址
    openAddressModal(){
      this.userAction = 0 //操作行为，新增地址
      this.checkedAddress = {}// 操作的对象
      this.showEditModal = true// 弹出删除模态框
    },

    // 编辑地址
    editAddressModal(item){
      this.modifyIndex = 1
      this.userAction = 1 //操作行为，新增地址
      this.checkedAddress = item// 编辑的地址对象
      // 省市区三级联动的值
      this.userAddress.province = item.receiverProvince
      this.userAddress.city = item.receiverCity
      this.userAddress.district = item.receiverDistrict
      
      // 由于这个项目的后台问题，只能通过【省】【市】级的值去在json对象中找索引，才能正确的下拉列表
      this.provinceIndex = this.addressInfo.findIndex((item)=>{
        if(this.userAddress.province === item.name){
          return true
        }
      })
      let cityArr = this.addressInfo[this.provinceIndex].children
      this.cityIndex = cityArr.findIndex((item)=>{
        if(this.userAddress.city === item.name){
          return true
        }
      })
      this.showEditModal = true// 弹出编辑模态框
    },

  }
}
</script>
<style lang="scss">
  .order-confirm{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:84px;
      .order-box{
        background-color:#ffffff;
        padding-left: 40px;
        padding-bottom: 40px;
        .addr-title{
          font-size: 20px;
          color: #333333;
          font-weight: 200;
          margin-bottom:21px;
        }
        .item-address{
          padding-top: 38px;
          .addr-list{
            .addr-info,.addr-add{
              box-sizing:border-box;
              float: left;
              width:271px;
              height:180px;
              border:1px solid #E5E5E5;
              margin-right: 15px;
              padding: 15px 24px;
              font-size: 14px;
              color:#757575;
            }
            .addr-info{
              cursor:pointer;
              h2{
                height:27px;
                font-size:18px;
                font-weight: 300;
                color:#333;
                margin-bottom:10px;
              }
              .street{
                height:50px;
              }
              .action{
                height:50px;
                line-height:50px;
                .icon{
                  width: 20px;
                  height: 20px;
                  fill: #666666;
                  vertical-align: middle;
                  &:hover{
                    fill: #FF6700;
                  }
                }
              }
              &.checked{
                border:1px solid #ff6700;
              }
            }
            .addr-add{
              text-align:center;
              color: #999999;
              cursor:pointer;
              .icon-add{
                width:30px;
                height:30px;
                border-radius:50%;
                background:url('/imgs/icon-add.png') #E0E0E0 no-repeat center;
                background-size:14px;
                margin: 0 auto;
                margin-top: 45px;
                margin-bottom: 10px;
              }
            }
          }
        }
        .item-good{
          margin-top:34px;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 12px;
          h2{
            border-bottom:1px solid #E5E5E5;
            padding-bottom: 5px;
          }
          li{
            display:flex;
            align-items: center;
            height:40px;
            line-height:40px;
            margin-top:10px;
            font-size:16px;
            color:#333333;
            .good-name{
              flex:5;
              img{
                width:30px;
                height:30px;
                vertical-align:middle;
              }
            }
            .good-price{
              flex:2;
            }
            .good-total{
              padding-right:44px;
              color:#FF6600;
            }
          }
        }
        .item-shipping,.item-invoice{
          margin-top:31px;
          line-height: 20px;
          h2{
            display: inline-block;
            margin-right: 71px;
            font-size: 20px;
            width: 80px;
          }
          span,a{
            font-size:16px;
            color:#FF6700;
            margin-right:23px;
          }
        }
        .detail{
          padding: 50px 44px 33px 0;
          border-bottom: 1px solid #f5f5f5;
          text-align: right;
          font-size: 16px;
          color: #666666;
          .item-val{
            color:#FF6700;
          }
          .item{
            line-height: 15px;
            margin-bottom: 12px;
          }
          .item-val{
            display:inline-block;
            width:100px;
          }
          .item-total{
            .item-val{
              font-size:28px;
            }
          }
        }
        .btn-group{
          margin-top: 37px;
          text-align: right;
        }
      }
    }
    .edit-wrap{
      font-size:14px;
      .item{
        margin-bottom: 15px;
        .input{
          padding-left: 15px;
          box-sizing: border-box;
          display: inline-block;
          width: 283px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #E5E5E5;
          outline: none;
          &+.input{
            margin-left: 14px;
          }
        }
        .el-select{
          width: 150px;
          &~.el-select{
            margin-left: 14px;
          }
        }
        textarea{
          height: 62px;
          padding: 13px 15px;
          box-sizing: border-box;
          border: 1px solid #E5E5E5;
          width: 100%;
          resize: vertical;
        }
      }
    }
  }
</style>
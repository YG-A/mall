<template>
  <div class="order-list">
    <div class="wrapper">

      <div class="container">
        <div class="order-box">
          <div v-show="!loading" class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}} 
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.currentUnitPrice}} X {{item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status === 10">
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}...</a>
              </div>
              <div class="good-state fr" v-else>
                <a>{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          
           <!-- 无订单记录时，替代内容的图片 -->
          <no-data tips="暂无订单记录" v-if="!loading && list.length === 0"></no-data>

          <!-- 加载时,loading图 -->
          <loading v-show="loading"></loading>

          <!-- 方案一 element-ui的分页器 -->
          <el-pagination
            v-show="!loading && list.length > 0"
            background
            layout="prev,pager,next"
            :page-size="pageSize"
            :total="total"
            @current-change="handleChange"
          >
          </el-pagination>

          <!-- 方案二 加载更多按钮 -->
          <!-- <div class="load-more" v-show="!loading">
            <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
          </div> -->

          <!-- 方案三 下拉加载更多 -->
          <!-- <div class="scroll-more"
            v-infinite-scroll="scrollMore" 
            infinite-scroll-disabled="busy" 
            infinite-scroll-distance="400"
          >
            <img v-show="moreLoading" src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="">
            <p v-show="!hasNextPage">到底啦!</p>
          </div> -->
 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from '../components/Loading.vue'
  import NoData from '../components/NoData.vue'
  import infiniteScroll from 'vue-infinite-scroll'
  import {Pagination} from 'element-ui'
  import {Button} from 'element-ui'
  export default{
    name:'order-list',
    components:{
      Loading,
      NoData,
      [Pagination.name]: Pagination,
      [Button.name]: Button
    },
    directives: {infiniteScroll},
    data(){
      return{
        list: [],
        loading: false,

        /* 这是分页器要用的 */
        pageSize: 3,// 每页显示3条数据
        pageNum: 1,// 默认第一页，根据点击不同页会改变
        total: 0,// 总共的订单数目

        /* 这是滚动加载更多要用的 */
        busy: false,
        moreLoading: false,
        hasNextPage: true// 是否还有下一页
      }
    },
    methods:{
      getOrderList(){
        this.loading = true
        this.axios.get('/orders',{
          params:{
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        }).then((res)=>{
          this.list = res.list
          this.loading = false
          this.total = res.total// 订单的总条目数
        }).catch((error)=>{
          console.log(error)
          this.loading = false
        })
      },
      goPay(orderNo){
        this.$router.push({
          path: '/order/pay',
          query: {
            orderNo
          }
        })
      },
      //1.分页器方案 当前页改变时触发这个回调函数
      handleChange(pageNum){
        // 保存当前页
        this.pageNum = pageNum
        this.getOrderList() 
      },

      // 2.滚动到底时加载方案
      scrollMore(){
        this.pageNum++
        this.addOrderList()
      },

      addOrderList(){
        this.moreLoading = true
        this.axios.get('/orders',{
          params:{
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        }).then((res)=>{
          this.list = this.list.concat(res.list)
          this.moreLoading = false
          this.hasNextPage = res.hasNextPage
          if(res.hasNextPage){
            this.busy = false
          }else{
            this.busy = true
          }
        }).catch((error)=>{
          console.log(error)
          this.loading = false
        })
      },

      // 3.点击按钮加载更多方案
      // loadMore(){
      //   this.pageNum++// 把当前页+1
      //   this.axios.get('/orders',{
      //     params:{
      //       pageSize: this.pageSize,
      //       pageNum: this.pageNum
      //     }
      //   }).then((res)=>{
      //     this.list = this.list.concat(res.list)
      //     this.loading = false
      //     this.total = res.total// 订单的总条目数
      //   }).catch((error)=>{
      //     console.log(error)
      //     this.loading = false
      //   })
      // }
    },
    mounted(){
      this.getOrderList()
    },

  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      min-height: 423px;
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          border: 1px solid $colorF;
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            height: 74px;
            line-height: 74px;
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              height: 145px;
              line-height: 145px;
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }

        /* 分页器样式start */
        .el-pagination{
          text-align: center;// 使得分页器居中
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
        .el-pagination.is-background .el-pager li:not(.disabled):hover{
          color: #FF6600;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
          color: #fff;
        }
        /* 分页器样式end */

        // .el-button--primary{
        //   background-color: #FF6600;
        //   border-color: #FF6600;
        // } 

        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>
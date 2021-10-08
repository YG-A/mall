<template>
  <div class="footer">
    <div class="container">
      <div class="footer-logo">
        <img src="/imgs/logo-footer.png" alt="">
        <p>小米商城</p>
      </div>
      <div class="footer-link">
        <p class="sites">
          <a rel="nofollow" href="https://www.mi.com/index.html" target="_blank">小米商城</a>
          <span class="sep">|</span> 
          <a rel="nofollow" href="https://www.miui.com/" target="_blank">MIUI</a> 
          <span class="sep">|</span> 
          <a rel="nofollow" href="https://home.mi.com/index.html" target="_blank">米家</a> 
          <span class="sep">|</span> 
          <a rel="nofollow" href="https://www.miliao.com/" target="_blank">米聊</a> 
          <span class="sep">|</span> 
          <a rel="nofollow" href="https://game.xiaomi.com/" target="_blank">学习无止境</a> 
        </p>
        <div class="copyright">Copyright ©2021 <span class="domain">mi.futurefe.com</span> All Rights Reserved</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nav-footer'
}
</script>
<style lang="scss" scoped>
  @import '../assets/scss/base.scss';
  @import '../assets/scss/mixin.scss';
  .footer{
    height: 234px;
    border-top: 4px solid #FF6600;
    background-color: #333;
    color: #999;
    text-align: center;
    .container{
      .footer-logo{
        margin-top: 46px;
        margin-bottom: 31px;
        img{
          width: 53px;
          height: 36px;
          margin-bottom: 13px;
        }
      }
      .footer-link{
        a{
          color: #999;
          &:hover{
            color: #FF6600;
          }
        }
        .sep{
          margin: 0 4px;
        }
        .domain{
          color: #FF6600;
        }
        .copyright{
          margin-top: 13px;
        }
      }
    }
  }
</style>
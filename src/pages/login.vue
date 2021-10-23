<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms">手机短信登录(未实现)</div>
            <div class="reg" @click="goToRegister()">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.mi.com" target="_blank">小米商城</a><span>|</span>
        <a href="https://www.mi.com" target="_blank">小米商城</a><span>|</span>
        <a href="https://www.mi.com" target="_blank">小米商城</a><span>|</span>
        <a href="https://www.mi.com" target="_blank">小米商城</a>
      </div>
      <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      userId: '',
    }
  },
  methods: {
    login(){
      let {username,password} = this
      this.axios.post('/user/login',{
        username,
        password
      }).then((res)=>{
        // 登录后需要存userId到cookie中，本项目后台会获取cookie是否有userId从而判断，用户是否登录了
        // this.$cookie.set('userId',res.id,{expires: '1M'})// 把登录成功返回的id保存到cookie中,有效时间为1个月
        this.$cookie.set('userId',res.id,{expires:'Session'})// 设置过期时间为Session，过期时间为一次会话(关闭这个浏览器不是关闭当前页窗口)
        this.$store.dispatch('saveUserName',res.username)
        // 使用params传一个参数来标识，是从login跳转的，需要再请求一次用户信息
        this.$router.push({
          name: 'index',// params传参只能用name
          params: {
            from:'login'
          }
        })
      }).catch((error)=>{
        this.$message.error('登录失败')
        console.log('登录失败',error);
      })
    },
    goToRegister(){
      this.$router.push('/register')
    }
  },
}
</script>
<style lang="scss" scoped>
.login{
  &>.container{
    height:113px;
    img{
      width:auto;
      height:100%;
    }
  }
  .wrapper{
    background:url('/imgs/login-bg.jpg') no-repeat center;
    .container{
      height:576px;
      position: relative;
      .login-form{
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width:410px;
        height:510px;
        background-color:#ffffff;
        position:absolute;
        bottom:29px;
        right:0;
        h3{
          line-height:23px;
          font-size:24px;
          text-align:center;
          margin:40px auto 49px;
          .checked{
            color:#FF6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          display:inline-block;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn-box{
          margin-top:10px;
          .btn{
            width:100%;
            height: 50px;
            line-height:50px;
            font-size:16px;
            display: inline-block;
          }
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:14px;
          cursor:pointer;
          .sms{
            color:#FF6600;
          }
          .reg{
            color:#999999;
            span{
              margin:0 7px;
            }
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top:60px;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>
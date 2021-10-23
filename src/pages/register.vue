<template>
  <div class="register">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号注册</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="input">
            <input type="text" placeholder="请输入邮箱" v-model="email">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="register">注册</a>
          </div>
          <div class="tips">
            <div class="sms">手机短信登录(未实现)</div>
            <div class="reg" @click="goToLogin()">已注册去登录<span>|</span>忘记密码？</div>
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
  name: 'register',
  data() {
    return {
      username: '',
      password: '',
      email:'',
      userId: '',
    }
  },
  methods: {
    goToLogin(){
      this.$router.push('/login')
    },
    register(){
      let {username,password,email} = this
      this.axios.post('/user/register',{
        username,
        password,
        email
      }).then((res)=>{
        // console.log(res)// {status: 0, msg: "注册成功"}
        if(res.status === 0){
          this.$message.success('注册成功')// element-ui插件，提示信息
          this.$router.push('/login')// 登录成功后跳转到index
        }
      }).catch((error)=>{
        this.$message.error('注册失败')
        console.log('注册失败',error);
      })
    }
  },
}
</script>
<style lang="scss">
.register{
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
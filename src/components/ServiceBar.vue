<template>
  <div class="service">
    <div class="container">
      <ul class="serviceList">
        <li>
          <a href="https://www.mi.com/service/quick-repair" target="_blank">
            <span class="icon-setting"></span>
            <span>预约维修服务</span>
          </a>
        </li>
        <li>
          <a href="https://www.mi.com/service/exchange#back" target="_blank">
            <span class="icon-7day"></span>
            <span>7天无理由退货</span>
          </a>
        </li>
        <li>
          <a href="https://www.mi.com/service/exchange#back" target="_blank">
            <span class="icon-15day"></span>
            <span>15天免费换货</span>
          </a>
        </li>
        <li>
          <a href="https://www.mi.com/service/buy/Postal%20policy" target="_blank">
            <span class="icon-post"></span>
            <span>满69包邮</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'service'
}
</script>
<style lang="scss" scoped>
  @import '../assets/scss/base.scss';
  @import '../assets/scss/mixin.scss';
  .service{
    padding: 33px 0;
    font-size: 16px;
    text-align: center;
    .container{
      .serviceList{
        display: flex;
        li{
          flex: 1;
          border-left: 1px solid #e5e5e5;
          &:first-of-type{
            border-left: none;
          }
          a{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #616161;
            &:hover{
              color: #FF6600;
            }
            span{
              &:first-of-type{
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;
                margin-right: 8px;
              }
              &.icon-setting{
                @include bgImg(20px,20px,'/imgs/icon-setting.png');
              }
              &.icon-7day{
                @include bgImg(20px,20px,'/imgs/icon-7day.png');
              }
              &.icon-15day{
                @include bgImg(20px,20px,'/imgs/icon-15day.png');
              }
              &.icon-post{
                @include bgImg(20px,20px,'/imgs/icon-post.png');
              }
            }
          }
        }
      }
    }
  }
</style>
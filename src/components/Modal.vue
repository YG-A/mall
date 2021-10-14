<template>
  <transition name="modal">
    <div class="modal" v-show="showModal">
      <div class="mask">
        <!-- 遮罩层 -->
      </div>
      <div class="modal-dialog">
        <!-- 弹框 -->
        <div class="modal-header">
          <p>{{title}}</p>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <!-- 根据btnType的值，显示不同的按钮 -->
          <a v-if="btnType==='1'" href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
          <a v-else-if="btnType==='2'" href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
          <div v-else-if="btnType==='3'" class="btn-group">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'modal',
  props:{
    // 弹框类型：small(小)、middle(中)、large(大)、form(表单)
    modalType: {
      type: String,
      default: 'form'
    },
    // 弹框标题
    title: String,
    // 按钮类型： 1：只有确定按钮，2：只有取消按钮，3：确定取消都有
    // 只需要用v-if判断这个值,然后给出不同个数的按钮即可
    btnType:String,
    // 确定按钮上的文本
    sureText:{
      type:String,
      default:'确定'
    },
    // 取消按钮上的文本
    cancelText:{
      type:String,
      default:'取消'
    },
    // 模态框是否显示
    showModal: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  @import '../assets/scss/config.scss'; 
  @import '../assets/scss/mixin.scss'; 
  @import '../assets/scss/button.scss'; /* 按钮 的通用样式 */
  @import '../assets/scss/modal.scss'; /* 模态框 的通用样式 */

</style>
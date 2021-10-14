import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  username: '',//登录的用户名称
  cartCount: 0,//购物车商品数量
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
})

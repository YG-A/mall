/* 
  Vuex-actions
*/
export default {
  saveUserName(context,username){
    context.commit('SaveUserName',username)
  },
  saveCartCount(context,cartCount){
    context.commit('SaveCartCount',cartCount)
  },
}
/* 
  Vuex-mutations
*/
export default {
  SaveUserName(state,username){
    state.username = username
  },
  SaveCartCount(state,cartCount){
    state.cartCount = cartCount
  }
}
<template>
    <div class="cart">
      <NavBar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
        <div class="bubu">
        </div>
      </NavBar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
export default {
  name: 'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    cartLength(){
      return this.$store.getters.cartLength
    }
  }
}
</script>

<style scoped>
.nav-bar{
  background-color:var(--color-tint);
  color:#fff;
  position: fixed;
  left:0;
  right:0;
  top:0;
  z-index: 9;
}
.cart-list{
  position:absolute;
  left:0;
  right:0;
  top:44px;
  bottom:89px;
  padding-bottom: 89px;

}
.bubu{
  height:500px;
}
</style>
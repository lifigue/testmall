<template>
    <div class="cart-list">
        <cart-list-item v-for="(item,index) in cartList" :key = "index" :itemInfo="item"></cart-list-item>
    </div>

</template>

<script>
// import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
  name: 'CartList',
  components:{
    CartListItem 
  },
  computed:{
    cartList(){
      return this.$store.state.cartList
    }
  }
}
</script>

<style scoped>
.cart-list{
    height:calc(100% -44px -49px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>
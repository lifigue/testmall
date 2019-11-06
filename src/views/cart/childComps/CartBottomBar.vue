<template>
   <div class="bottom-bar">
       <div class="check-content">
       <check-button class="check-button" 
       :is-checked="isSelectAll"
       @click.native="checkClick"></check-button>
       <span>全选</span>
       </div>
    <div class="price">
        合计:¥{{totalPrice}}
    </div>
    <div class="calculate" @click="calClick">
        去计算({{checkLength}})
    </div>
   </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'CartBottomBar',
  components:{
      CheckButton
  },
  computed:{
      totalPrice(){
          //这里很妙哦！
          return this.$store.state.cartList.filter(item=>{
              return item.checked 
          }).reduce((preValue,item)=>{
              return  preValue+item.count*item.price
          },0).toFixed(2)
      },
      checkLength(){
          return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
          //return !this.$store.state.cartList.filter(item => !item.checked).length
          if(this.$store.state.cartList.length===0) return false
          else{return !this.$store.state.cartList.find(item=>!item.checked)}
      }
      
  },
  methods:{
      checkClick(){
          if(this.isSelectAll){
              this.$store.state.cartList.forEach(item => item.checked = false)
          }else{
              this.$store.state.cartList.forEach(item => item.checked = true)
          }
        
      },
      calClick(){
          if(!this.isSelectAll){
              this.$toast.show('请选择购买的商品',2000)
          }
      }
  }

}
</script>

<style scoped>
.bottom-bar{
    height:40px;
    background-color:#eee;
    position:fixed;
    left:0;
    right:0;
    bottom:49px;
    z-index: 10;
    line-height: 40px;
    display:flex;
    font-size:14px;

}
.check-content{
    display:flex;
    align-items: center;
    margin-left:10px;
    width:70px;
}
.check-button{
    width:20px;
    height:20px;
    line-height: 20px;
    margin-right:5px;
}
.price{
    margin-left:25px;
    flex:1;
}
.calculate{
    width:80px;
    background-color: var(--color-tint);
    text-align: center;
    color:#fff;
}
</style>
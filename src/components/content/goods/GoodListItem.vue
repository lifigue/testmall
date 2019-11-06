<template>
<div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
        <p>{{ goodsItem.title }}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
    </div>
</div>

    
</template>

<script>



export default {
  name: 'GoodsListItem',
  data(){
      return{
          jumpid:''
      } 
  },
  props:{
      goodsItem:{
          type:Object,
          default(){
              return []
          }
      }
  },
  computed:{
      showImage(){
          return this.goodsItem.image || this.goodsItem.show.img
      },
/*       idchangge(){
         // return this.goodsItem.iid || this.goodsItem.item_id
         if ('iid' in goodsItem){
             return this.goodsItem.iid
         }else{
             return this.goodsItem.item_id
         }
      } */
  },
  methods:{
      imageLoad(){
          this.$bus.$emit("itemImageLoad")
      },
      itemClick(){
          console.log("跳转到详情页")
          this.jumpid = this.goodsItem.iid
          if(!this.goodsItem.hasOwnProperty('iid')){
              this.jumpid=this.goodsItem.item_id
          }
          this.$router.push('/detail/'+ this.jumpid)
      }
  }


}

</script>

<style scoped>
.goods-item{
    padding-bottom: 40px;
    position:relative;
    width:48%;
}
.goods-item img{
    width:100%;
    border-radius:5px;
}
.goods-info{
    font-size:12px;
    position: absolute;
    bottom:5px;
    left:0;
    right:0;
    overflow:hidden;
    text-align: center;
}
.goods-item p{
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    margin-bottom: 3px;
}

.goods-info .price{
    color:var(--color-high-text);
    margin-right:20px;
}

.goods-info .collect{
    position: relative;
}

.goods-info .collect::before{
    content:'';
    position:absolute;
    left:-15px;
    top:-1px;
    width:14px;
    height: 14px;
    background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
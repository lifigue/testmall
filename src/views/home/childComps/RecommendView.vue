<template>
    <div class="recommend">
        <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{ item.title }}</div>
            </a>
        </div>
    </div>

    
</template>

<script>


export default {
  name: 'RecommendView',
  props:{
      recommends:{
          type:Array,
          default(){
              return []
          }
      }
  },
  
  components:{

  }
}

</script>

<style>
.recommend{
    display:flex;
    width:100%;
    font-size:12px;
    padding:10px 0 18px;
    margin-bottom: 10px;
    border-bottom: 8px solid #eee;
}
.recommend-item{
    flex:1;
    text-align: center;
    

}
.recommend-item img{
    width:65px;
    height:65px;
    margin-bottom: 8px;

}
</style>
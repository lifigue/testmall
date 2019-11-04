<template>

    <div class="wrapper">
        <swiper v-if="banners.length>1" :options="swiperOption">
          <swiper-slide v-for="(item,index) in banners" :key="index">
             <a :href="item.link">
            <img :src="item.image"  @load="imageLoad">
            </a>
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
    </div>
</template>

<script>  
  import 'swiper/dist/css/swiper.css'
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
	export default {
    name: "Swiperawesome",
     props:{
      banners:{
          type:Array,
          default(){
              return []
          }
      }
    },
    components:{
      swiper,
      swiperSlide
    },
    data() {
    return {
       swiperOption: {
          pagination: {
            el: '.swiper-pagination',
          },
          slidePerView:1,
          autoplay:{
            delay:1500,
            disableOnInteraction:false
          },
          loop:true,

       },
      isload:false
      }
    },
  methods:{
    imageLoad(){
      if(!this.isload){
        this.$emit('swiperImageLoad')
        this.isload=true
      }

    }
  }
  }
</script>



<style lang="stylus" scoped>
  .wrapper >>>.swiper-pagination-bullet-active  //看这里
    background :#ffffff
  .wrapper
    overflow :hidden
    width :100%
  .wrapper img
    width:100%

       

</style>

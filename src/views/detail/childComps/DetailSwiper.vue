<template>
     <div class="wrapper">
        <swiper v-if="topimages.length>1" class="swiper" :options="swiperOption">
          <swiper-slide class="swiper-item" v-for="(item,index) in topimages" :key="index">
            <img :src="item">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
    name: "DetailSwiper",
    props:{
        topimages:{
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
          autoplay:{
            delay:1500,
            disableOnInteraction:false
          },
          loop:true,

       }
      }
    },


}
</script>

<style lang="stylus" scoped>
.wrapper >>>.swiper-pagination-bullet-active
    background :#ffffff
.wrapper

    width :100%
.wrapper img
    width:100%
.swiper
    height 400px
    overflow :hidden


       

</style>
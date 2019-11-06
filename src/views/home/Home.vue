<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" 
                      :titles="['流行','新款','精选']" 
                      @tabClick="tabClick1" 
                      ref="tabControl1" v-show="isTabFixed"
                      ></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore"
           >
<!--         <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper> -->
        <swiper-awesome :banners="banners" @swiperImageLoad="swiperImageLoad"></swiper-awesome>

        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabClick1" 
                      ref="tabControl2" 
                      ></tab-control>
        <good-list :goods="goods[currentType].list"></good-list>  

    </scroll>
    <!-- 自定义组件没有click监听事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>


  </div>
    
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import SwiperAwesome from 'components/common/swiper/Swiperawesome'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'


import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils.js'
import {backTopMixin} from 'common/mixin'





export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,

    SwiperAwesome
  },
  mixins:[backTopMixin],
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      // isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
    }
  },
  created(){
    this.getHomeMultidata();
    //获取数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted(){
      const refresh= debounce(this.$refs.scroll.refresh,500)
      this.itemImgListener= ()=> {
      refresh()}
      this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY= this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{

    //事件监听相关方法
    tabClick1(index){
      switch(index){
        case 0:
          this.currentType='pop'
          //console.log(this.currentType)
          break
        case 1:
          this.currentType='new'
          //console.log(this.currentType)
          break
        case 2:
          this.currentType="sell"
          //console.log(this.currentType)
          break

      }
      this.$refs.tabControl1.currentindex=index;
      this.$refs.tabControl2.currentindex=index;
    },
    //scroll组件里加了ref="scroll", 可以通过this.$refs.scroll拿到scroll组件
    // backClick(){
    //   this.$refs.scroll.scrollTo(0,0)
    // },
    contentScroll(position){
      this.isShowBackTop=-position.y>1000
      
      this.isTabFixed=(-position.y) >this.tabOffsetTop
    },

    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      /* console.log(this.$refs.tabControl2.$el.offsetTop) */
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },

    //网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
      /* console.log(res); */
      this.banners =res.data.banner.list;
      this.recommends =res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page= this.goods[type].page +1
      getHomeGoods(type,page).then(res =>{
      /* console.log(res); */
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page+=1
      this.$refs.scroll.finishPullUp()


    })
/*     getHomeGoods(type){
      console.log(this.goods[type].page)
      const page1=1
      getHomeGoods(type,page1).then(res =>{
        console.log(res);
      })
    } */
  }
}
}
</script>

<style scoped>
#home{
  height:100vh;

}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
/*   position:fixed;
  left:0;
  right:0;
  top:0;*/
  z-index:9; 
}

/* 秀啊，这个操作可以啊，就是说子绝父相来解决不同屏幕的适配 */
.content{
  overflow: hidden;
  position:absolute;
  top:44px;
  bottom:49px;
  left:0;
  right:0;
}
.tab-control{
  position:relative;
  z-index:9;
}

/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top:60px;

} */
</style>
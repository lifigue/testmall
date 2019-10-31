<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick1"></tab-control>
        <good-list :goods="goods[currentType].list"></good-list>  

    </scroll>

    <back-top @click.native="backClick" v-show="isShow"></back-top>


  </div>
    
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'





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
    BackTop
  },
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
      isShow:false
    }
  },
  created(){
    this.getHomeMultidata();
    //获取数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
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
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      this.isShow=-position.y>1000
    },



    //网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
      console.log(res);
      this.banners =res.data.banner.list;
      this.recommends =res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page= this.goods[type].page +1
      getHomeGoods(type,page).then(res =>{
      console.log(res);
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page+=1


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
  padding-top:44px;
  height:100vh;
  position:relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
  position:fixed;
  left:0;
  right:0;
  top:0;
  z-index:9;
}
.tab-control{
  position:sticky;
  top:44px;

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
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top:60px;

} */
</style>
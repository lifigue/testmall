<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>

    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
        <li>a</li>
      <li>b</li>
      <li>c</li>
            <li>a</li>
      <li>b</li>
      <li>c</li>
        <li>a</li>
      <li>b</li>
      <li>c</li>
            <li>a</li>
      <li>b</li>
      <li>c</li>
        <li>a</li>
      <li>b</li>
      <li>c</li>
            <li>a</li>
      <li>b</li>
      <li>c</li>
        <li>a</li>
      <li>b</li>
      <li>c</li>
            <li>a</li>
      <li>b</li>
      <li>c</li>
        <li>a</li>
      <li>b</li>
      <li>c</li>      <li>a</li>
      <li>b</li>
      <li>c</li>
        <li>a</li>
      <li>b</li>
      <li>c</li>      <li>a</li>
      <li>b</li>
      <li>c</li>
        <li>a</li>
      <li>b</li>
      <li>c</li>      <li>a</li>
      <li>b</li>
      <li>c</li>
        <li>a</li>
      <li>b</li>
      <li>c</li>
    </ul>

  </div>
    
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultidata,getHomeGoods} from 'network/home'



export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'news':{page:0,list:[]},
        'sell':{page:0,list:[]},
      }
    }
  },
  created(){
    this.getHomeMultidata();
    this.getHomeGoods('pop');
  },
  methods:{
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

<style>
#home{
  padding-top:44px;
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
</style>
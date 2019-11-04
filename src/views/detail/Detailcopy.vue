<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <!-- scroll里的需要给一个固定高度 -->
  
        <detail-swiper :topimages="topImages" ></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
        <goods-list :goods="recommends"></goods-list>
 
</div>

    
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from  'views/detail/childComps/DetailSwiper'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'


import Scroll from 'components/common/scroll/Scroll' 
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,getRecommand,Goods,Shop,GoodsParam} from 'network/detail'


export default {
    name: "Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList
    },
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            thmeTopYs:[0,1000,2000,3000]
        }
    },
    methods:{
        titleClick(index){
            console.log(index)
            this.$refs.cro
        }
    },

    created(){
        this.iid=this.$route.params.iid
        getDetail(this.iid).then(res =>{
            const data = res.result;
            this.topImages=data.itemInfo.topImages

            this.goods= new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            this.shop = new Shop(data.shopInfo)

            this.detailInfo =data.detailInfo

            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            if (data.rate.list) {
            this.commentInfo = data.rate.list[0]
          }
        })

         getRecommand().then(res=>{
            this.recommends = res.data.list
        })
    },
    


}
</script>

<style scoped>
.detail-nav{
    position:fixed;
    top:0;
    left:0;
    right:0;
    background-color: #fff;
    z-index:9
}
#detail{
    position: relative;
    /* z-index:9; */
    background: #fff;
    height:100vh;
    z-index:2
}
.content {
    height: calc(100% - 44px);
}

</style>
<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <!-- scroll里的需要给一个固定高度 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :topimages="topImages" ></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends" class="goods-list"></goods-list>
    </scroll>
        <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"/> -->
  
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
import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'


import Scroll from 'components/common/scroll/Scroll' 
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'


import {getDetail,getRecommand,Goods,Shop,GoodsParam} from 'network/detail'
import {debounce} from 'common/utils.js'
import {backTopMixin} from 'common/mixin.js'

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
        GoodsList,
        DetailBottomBar,
        // Toast

    },
    mixins:[backTopMixin],
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
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0
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

            // this.$nextTick(()=>{
            //     this.themeTopYs =[]
            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            //     console.log(this.themeTopYs)

            // })

            this.getThemeTopY = debounce(()=>{
                this.themeTopYs =[]
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                console.log(this.themeTopYs)

            },100)

        })


        getRecommand().then(res=>{
            this.recommends = res.data.list
        })
    },
    methods:{
        imageLoad(){
            console.log("收到！")
            this.$refs.scroll.refresh();
            this.getThemeTopY()

        },
        titleClick(index){
            console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)

        },
        contentScroll(position){
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(let i=0; i<length; i++){
                if(this.currentIndex!==i&&((i<length -1 && positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) ||
                (i===length-1 && positionY >= this.themeTopYs[i])))
                {
                    this.currentIndex=i
                    console.log(this.currentIndex);
                    this.$refs.nav.currentIndex=this.currentIndex

                }
            
            }

            this.isShowBackTop=-position.y>1000

        },
        addToCart(){
            //获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc  = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            product.count = 1
            product.checked = true
            console.log(product)

            // this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product).then(res =>{ 
                console.log(this.$toast)
                this.$toast.show(res,1500)

            })

        }
    }
    

}
</script>

<style scoped>
#detail{
    position: relative;
    z-index:9;
    background: #fff;
    height:100vh;
}
/* .content {
    height: calc(100% - 44px);
} */
.content{
  overflow: hidden;
  position:absolute;
  top:44px;
  bottom:58px;
  left:0;
  right:0;
}
.detail-nav{
    position:relative;
    z-index:9;
    background-color: #fff;
}
.back-top{
    position:fixed;
    bottom: 58px;
    right: 10px;
}
.goods-list{
    padding-bottom: 120px;
}
</style>
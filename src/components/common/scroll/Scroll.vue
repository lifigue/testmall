<template>

<div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>

</div>
    
</template>

<script>
import BScroll from 'better-scroll'


export default {
    name: 'Scroll', 
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }

    },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        this.scroll=new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click: true,
            pullUpLoad:this.pullUpLoad

        })
    //监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            this.$emit("scroll",position)
        })
   /*          //监听上拉事件
        this.scroll.on("pullingUp",()=>{
            //把事件发出去给外面
            this.$emit("pullingUp")
            console.log("上拉加载更多")
        }) */


        //监听scroll滚动到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })
        }
    },

    methods:{
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }
}

</script>

<style scoped>

</style>
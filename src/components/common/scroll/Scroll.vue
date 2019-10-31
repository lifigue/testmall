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
        probeType:Number,
        default:0
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
        })
    //监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            this.$emit("scroll",position)
        })
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time)
        }
    }
}

</script>

<style>

</style>
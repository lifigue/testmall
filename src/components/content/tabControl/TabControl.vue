<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key=index :class="{active:index===currentindex}" @click="colorchange(index)">
            <span>{{item}}</span>
        </div>

    </div>
</template>

<script>

export default {
  name: 'TabControl',
  props:{
      titles:{
          type:Array,
          //default是对象或者数字时候，要用函数返回默认值
          default(){
              return []
          }
      }
  },
  data(){
      return {
          currentindex:0
      }
  },
  methods:{
      colorchange(index){
          this.currentindex=index;
          this.$emit('tabClick',index)
      }
  }
}

</script>

<style scoped>
.tab-control{
    display:flex;
    text-align: center;
    font-size:15px;
    height:40px;
    line-height:40px;
    background-color: #fff;

}
.tab-control>div{
    flex:1;

}
.tab-control>div>span{
    padding:3px;
}
.active{
    color:var(--color-high-text);
}

.active span{
    border-bottom: 2px solid var(--color-high-text);
}

</style>
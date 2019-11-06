<template>
    <div class="toast" v-show="isshow">
        <div >{{ message }}</div>

    </div>
</template>

<script>


export default {
  name: 'Toast',
  data(){
      return{
          message:'',
          isshow:false
      }
  },
//   props: {
//       message:{
//       type: String,
//       default:''
//       },
//       show:{
//         type:Boolean,
//         default:false
//       }
//   },

  methods:{
      show(message,duration){
          console.log(this.isshow, this.message)
          this.isshow = true;
          this.message = message;


          setTimeout(()=>{
              this.isshow=false;
              this.message=''
          },duration)
      }
  }
}
</script>

<style scoped>
.toast{
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    color:#fff;
    padding:5px;
    background-color: rgba(0,0,0,0.75);
    z-index: 40;
}

</style>

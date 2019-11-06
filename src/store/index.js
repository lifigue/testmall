import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  getters:{
    cartLength(state){
      return state.cartList.length
    }
  },
  //任何数据的更改都要经过mutations
  mutations: {
    // addCart(state,payload){
    //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    //   console.log(oldProduct)
    //   if (oldProduct){
    //     oldProduct.count+=1
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }


    // addCart(state,payload){
    //   let oldProduct = null;
    //   for(let item of state.cartList){
    //     if(item.iid === payload.iid ){
    //       oldProduct = item;
    //     }
    //   }
    //   if(oldProduct){
    //     oldProduct.count += 1
    //   }else{
    //     state.cartList.push(payload)
    //   }

    // }

    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      state.cartList.push(payload)
    } 
  },
  actions: {
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        console.log(oldProduct)
        if (oldProduct){
          // oldProduct.count += 1
          context.commit('addCounter',oldProduct)
          resolve('当前数量加1')
        }else{
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit('addToCart',payload)
          resolve('添加了新的商品')
        }
      })
    }
  }

})

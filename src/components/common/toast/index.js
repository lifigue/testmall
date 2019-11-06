
import Toast from './Toast'

const obj = {}

obj.install = function(Vue){
    // document.body.appendChild(Toast.$el);

    //1.创建组件构造器
    const toastconstructor = Vue.extend(Toast)
    //2.new的方式，根据组件构造器，可以创建出一个组件对象
    const toast = new toastconstructor()
    //3.将组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}
export default obj
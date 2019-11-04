
export function debounce(func,delay){
    let timer=null
    return function(...args){
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{

        func.apply(this,args)
    },delay)
    }
}

export function formatDate(date, fmt) {
    //1.获取年份 y+用于不确定传入y数量的场景
    //2019
    //yy -19
    //yyyy -2019
    //y -9
    //RegExp.$1代表匹配到的yyyy,substr做截取，根据传入的fmt
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    //2.
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
      // '00'+'4'='004'然后做截取
    return ('00' + str).substr(str.length);
  };
  
  
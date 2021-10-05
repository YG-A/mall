 /* 
  Storage封装,把整个网站的storage封装到一个mall中
  mall:{
    user:{....},
    order:{....}
  }
  mall中分不同的模块，封装着不同的信息

 */
const STORAGE_KEY = "mall"
export default {
  // getStorage获取整个storage对象
  getStorage(){
    let str = window.sessionStorage.getItem(STORAGE_KEY) || '{}'
    return JSON.parse(str)
  },
  // 存储值
  setItem(key,value,module_name){
    if(module_name){
      let val = this.getStorage()
      val[module_name][key] = value
      window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    }else{
      let val = this.getStorage()
      val[key] = value
      window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    }
  },
  // 获取值
  getItem(key,module_name){
    if(module_name){
      let val = this.getItem(module_name)
      if(val) return val[key]
    }
    return this.getStorage()[key]
  },
  // 清空
  clear(key,module_name){
    let val = this.getStorage()
    if(module_name){
      if(!val[module_name]) return 
      delete val[module_name][key]
    }else{
      delete val[key]
    }
    window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
  } 
}
//柯理化函数：闭包的进阶应用
//核心：预先处理、预先存储 利用闭包的保存作用：凡是形成一个闭包，存储一些信息，供其上下文调取使用的，都是柯理化思想
function curring(){
  let params=[]
   function fn(...args){
     params=params.concat(args)
     return fn
  }
  fn.toString=function(){
    return params.reduce((a,b)=>{
      return a+b
    })
  }
  return fn
}
let add= curring()
let res=add(1)(2)(3)
console.log(res)//6

add=curring()
res=add(1,2,3)(4)
console.log(res)//10

 add= curring()
 res=add(1)(2)(3)(4)(5)
console.log(res)//15
//------------------------------------------------------------
const add=x=>x+1
const mul=x=>x*8 
const div1=x=>x/2
//方法一
function compose(...funcs){
 let len=funcs.length
 if(len===0)return x=>x
 if(len===1)return funcs[0]
 return function(x){
   return funcs.reduceRight((a,b){
     return b(a)
   },x)
 }
}
//方法二
function compose(...funcs){
  if(funcs.length===0)return arg=>arg
  if(funcs.length===1)return funcs[0]
  return funcs.reduce((a,b)=>(...args)=>a(b(...args)))
}
const operate=compose(div1,mul,add)
console.log(operate(0))

function reduce(callback,initial){
  let self=this,i=0,result
  if(typeof initial==='undefined'){
    initial=self[0]
    i=1
  }
  result=initial
  for(;i<self.length;i++){
    result= callback(result,self[i],i)
  }
}

/*
1. promise是一个类，不用考虑兼容性
2. 当时用promise的时候，会传入一个执行器，此执行器是立即执行
*/
const PENDING='PENDING'
const FULFILLED='FULFILLED'
const REJECTED='REJECTED'
class Promise{
   constructor(executor){
      this.status=PENDING
      this.value=undefined
      this.reason=undefined
      this.onResolveCB=[]
      this.onRejectedCB=[]
      const resolve=(value)=>{
        if(this.status===PENDING){
          this.value=value
          this.status=FULFILLED
          this.onResolveCB.forEach(fn=>fn())
        }
      }
      const reject=(value)=>{
        if(this.status===PENDING) {
          this.reason=value
          this.status=REJECTED
          this.onRejectedCB.forEach(fn=>fn())
        }
      }
      try{
        executor(resolve,reject)
      }catch(e){
        reject(e)
      }
   }
   then(onFulfilled,onRejected){
      if(this.status==PENDING){
        this.onResolveCB.push(()=>{
          onFulfilled(this.value)
        })
        this.onRejectedCB.push(()=>{
          onRejected(this.reason)
        })
      }
      if(this.status==FULFILLED){
        onFulfilled(this.value)
      }
      if(this.status==REJECTED){
        onRejected(this.reason)
      }
   }
}
module.exports=Promise
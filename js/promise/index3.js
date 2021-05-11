/*
1. promise是一个类，不用考虑兼容性
2. 当时用promise的时候，会传入一个执行器，此执行器是立即执行

3.promise的链式调用，当调用then方法后UI返回一个新的promise
  - then中方法返回的是一个（普通值 不是promise）的情况，会作为外层下一次then的成功结果
  - then中方法执行出错 会走到外层下一次then的失败结果
  无论上一次then走的是成功还是失败，只要返回的是普通值 都会执行下一次then的成功
  - 如果then中方法返回是一个promise对象，此时会根据promise的结果来处理是成功还是失败

  总结 如果返回一个普通值（除了promise）就会传递给下一个then的成功，如果返回一个失败的promise或者抛出异常，会走下一个then的失败
*/
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
//利用x的值来判断是调用promise2的resolve还是reject
function resolvePromise(promise2, x, resolve, reject) {
  //别人的promise可能调用成功后，还能调用失败
  let called = false
  if (promise2 === x) {
    return reject(new TypeError('error'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        //then.call(x)//相当于x.then，x.then这样写会触发getter可能会触发异常
        then.call(x, y => {
          if (called) return
          called = true
          //resolve(y)y可能是promise
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        if (called) return
        called = true
        reject(x)
      }

    } catch (e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}
class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolveCB = []
    this.onRejectedCB = []
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onResolveCB.forEach(fn => fn())
      }
    }
    const reject = (value) => {
      if (this.status === PENDING) {
        this.reason = value
        this.status = REJECTED
        this.onRejectedCB.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled=typeof onFulfilled==='function'?onFulfilled:v=>v
    onRejected=typeof onRejected==='function'?onRejected:err=>{throw err}
    //用于实现链式调用
    let promise2 = new Promise((resolve, reject) => {
      if (this.status == PENDING) {//当executor代码是异步的时候
        this.onResolveCB.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          });

        })
        this.onRejectedCB.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          });

        })
      }
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        });


      }
      if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        });


      }
    })
    return promise2
  }
}
module.exports = Promise
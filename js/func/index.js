//柯理化函数：闭包的进阶应用---多个参数的传入 把他转化成n个函数
//核心：预先处理、预先存储 利用闭包的保存作用：凡是形成一个闭包，存储一些信息，供其上下文调取使用的，都是柯理化思想
//函数的定义是有作用域的概念，一个函数的作用域和执行的作用域不在同一个 肯定会出现闭包
function curring() {
  let params = []
  function fn(...args) {
    params = params.concat(args)
    return fn
  }
  fn.toString = function () {
    return params.reduce((a, b) => {
      return a + b
    })
  }
  return fn
}
let add = curring()
let res = add(1)(2)(3)
console.log(res)//6

add = curring()
res = add(1, 2, 3)(4)
console.log(res)//10

add = curring()
res = add(1)(2)(3)(4)(5)
console.log(res)//15
//------------------------------------------------------------
const add = x => x + 1
const mul = x => x * 8
const div1 = x => x / 2
//方法一
function compose(...funcs) {
  let len = funcs.length
  if (len === 0) return x => x
  if (len === 1) return funcs[0]
  return function (x) {
    return funcs.reduceRight((a, b){
      return b(a)
    }, x)
  }
}
//方法二
function compose(...funcs) {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
const operate = compose(div1, mul, add)
console.log(operate(0))

function reduce(callback, initial) {
  let self = this, i = 0, result
  if (typeof initial === 'undefined') {
    initial = self[0]
    i = 1
  }
  result = initial
  for (; i < self.length; i++) {
    result = callback(result, self[i], i)
  }
}
//-----------------------------------------
function core(...arg) {

  console.log('core', ...arg)

}
Function.prototype.before = function (cb) {
  return (...arg) => {
    cb()
    this(...arg)
  }
}
let newFunc = core.before(() => { })
newFunc(...arg)
//--------------------------------------------------------
// length 是JS函数对象的一个属性值，该值是指 “该函数有多少个必须要传入的参数”，即形参的个数
// 形参的数量不包括剩余参数个数，仅包括 “第一个具有默认值之前的参数个数”
function curring(fn) {
  const inner = (args=[]) => {
    //fn.length 是指fn形参的个数
    return args.length>=fn.length?fn(...args):(...userArgs)=>inner([...args,...userArgs])
  }
  return inner()
}
function sum(a, b, c, d) {
  return a + b + c + d
}
let sum1 = curring(sum)
let sum2 = sum1(1)
let sum3 = sum2(2, 3)
let result = sum3(5)
console.log(result)
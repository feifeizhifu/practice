Array.prototype.reduce = function (callback, prev) {
  //this指的是数组
  for (let i = 0; i < this.length; i++) {
    if (!prev) {
      prev = callback(this[i], this[i + 1], i + 1, this)
      i++
    } else {
      prev = callback(prev, this[i], i, this)
    }

  }
}
//compose 组合函数
function sum(a, b) {
  return a + b
}
function len(str) {
  return str.length
}
function addPrefix(str) {
  return '$' + str
}
//addPrefix(len(sum('a','b')))
let final = compose(addPrefix, len, sum)
final('a', 'b')
//方法一
const compose1 = (..fns)=> {
  return function (...args) {
    let lastFn = fns.pop()
    let r = lastFn(...args)
    return fns.reduceRight((prev, next) => {
      return next(prev)
    }, r)
  }
}
//方法二
const compose2 = (...fns) => {
  //final相当于reduce的返回函数
  return fns.reduce(function (prev, next) {
    return function (...args) {
      return prev(next(...args))
    }
  })
}
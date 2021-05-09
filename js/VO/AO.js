// var a={n:1}
// var b=a
// a.x=a={c:2}
// console.log(a,b)//{ c: 2 } { n: 1, x: { c: 2 } }

// var x=[12,23]
// function fn(y){
//   y[0]=100
//   y=[100]
//   y[1]=200
//   console.log(y)//[100,200]
// }
// fn(x)
// console.log(x)//[100,23]

//函数执行的上下文是它的作用域--只和在哪船舰的有关系，和在哪执行没有关系
var i=0
function A(){
  var i=10
  function x(){
    console.log(i)
  }
  return x
}
var y=A()
y()//10
function B(){
  var i=3
  y()
}
B()//10

let x=5
function fn(x){
  return function(y){
    console.log(y+ ++x)
  }
}
let f=fn(6)
f(7)
fn(8)(9)
f(10)
console.log(x)
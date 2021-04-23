var a={n:1}
var b=a
a.x=a={c:2}
console.log(a,b)//{ c: 2 } { n: 1, x: { c: 2 } }

var x=[12,23]
function fn(y){
  y[0]=100
  y=[100]
  y[1]=200
  console.log(y)//[100,200]
}
fn(x)
console.log(x)//[100,23]
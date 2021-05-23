let a:number[]=[1,2,3]
let b:Array<number>=[1,2,3]
let c:[string|number]=['s']
//枚举
enum Color {red,green,blue}
console.log(Color[0])//red
enum Status {success=1,fail=3}
console.log(Status.fail)//3
var obj:any=4
console.log(obj.subStr())
//Void void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
function show ():void{
    console.log('hello')
}
//接口
/*
interface Point {
    readonly x: number;
    readonly y: number;
     z?: number;
}
*/
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
  }
  
  let myObj = { size: 10, label: "Size 10 Object" };
  printLabel(myObj);
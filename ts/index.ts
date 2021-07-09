// let a:number[]=[1,2,3]
// let b:Array<number>=[1,2,3]
// let c:[string|number]=['s']
// //枚举
// enum Color {red,green,blue}
// console.log(Color[0])//red
// enum Status {success=1,fail=3}
// console.log(Status.fail)//3
// var obj:any=4
// console.log(obj.subStr())
// //Void void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
// function show ():void{
//     console.log('hello')
// }
// //接口
// /*
// interface Point {
//     readonly x: number;
//     readonly y: number;
//      z?: number;
// }
// */
// function printLabel(labelledObj: { label: string }) {
//     console.log(labelledObj.label);
//   }
  
//   let myObj = { size: 10, label: "Size 10 Object" };
//   printLabel(myObj);

// interface Params<U>{
//     value:U,
//     getValue:()=>U
// }
// class subParams<T> implements Params<T>{
//     value:T
//    constructor(value:T){
//        this.value=value
//    }
//    getValue():T{
// return this.value
//    }
// }
// new subParams('23')
// interface Person{
//     name:string,
//     age:number,
//     location:string
// }
// type K1 = keyof Person;// "name" | "age" | "location"
// function Persom<T,K extends keyof T>(obj:T,key:K):T[K]{
//     return obj[key]
// }
enum Difficulty {
    Easy,
    Intermediate,
    Hard
  }
  
  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  
  let tsInfo = {
     name: "Typescript",
     supersetOf: "Javascript",
     difficulty: Difficulty.Intermediate
  }
   
  let difficulty: Difficulty = 
 getProperty(tsInfo, 'difficulty'); // OK
 let supersetOf: string = 
 getProperty(tsInfo, 'supersetOf'); 

console.log(supersetOf,'difficulty')
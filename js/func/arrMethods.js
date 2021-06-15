let arr = [1, 2, 3, 4, 5, 6];
let a = arr.splice(-2, 2, "w", "q");
console.log(a, arr);
// Array.prototype.splice = function () {
//   let args = [...arguments];
//   let self = this;
//   let newArr = [];

//   for (let i = 0; i < args.length; i++) {
//     if (i >= 2) {
//       newArr.push(args[i]);
//     }
//   }
//   for (let  i= 0;  i< self.length; i++) {

//   }
// };

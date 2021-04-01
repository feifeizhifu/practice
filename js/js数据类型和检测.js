/*
js中的数据类型
原始值类型
  number:
    NaN(不是一个有效数字) isNaN()=>默认隐式转换数字类型，再校验是否是有效数字
    Infinity(无穷大的值)
  string
  boolean
  null 
  undefined 
  symbol:唯一值
  bigint
对象类型
  标椎对象 object
  标准特殊对象 Array/Regexp/Date/Error/Math/ArrayBuffer/DataView/Set/Map... 
  非标准特殊对象 Number/String/Boolean/Symbol/BigInt... 
  可调用对象（实现了call方法） function
*/
/*
Object.is(NaN,NaN) =>true
*/
//最大安全数 最小安全数，超过该数字计算的话就不太准确了，可以使用BigInt(value)toString可以还原 
console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
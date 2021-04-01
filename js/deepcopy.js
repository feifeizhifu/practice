//todo 循环引用深拷贝
const obj = {
  x: 1,
  y: 2,
};
obj.z = obj;

function copy(data) {
  if (typeof data !== "object") return data;
  let obj = new data.constructor();
  for (let i in data) {
    obj[i] = copy(data[i]);
  }

  return obj;
}

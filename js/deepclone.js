//todo 循环引用深拷贝
const obj = {
  x: 1,
  y: 2,
};
obj.z = obj;

function deepClone(data, hash = new WeakMap()) {
  if (data == null) return data
  if (data instanceof RegExp) return new RegExp(data)
  if (data instanceof Date) return new Date(data)

  if (typeof data !== "object") return data;
  //如果拷贝过的对象不需要再次拷贝
  if (hash.has(data)) return hash.get(obj)
  let copy = new data.constructor();
  hash.set(data, copy)
  for (let i in data) {
    if (obj.hasOwnProperty(i)) {
      copy[i] = deepClone(data[i], hash);
    }
  }
  return obj;
}

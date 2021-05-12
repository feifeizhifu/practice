const Promise = require("./index3");

Promise.all = function (promises) {//并发
  return new Promise((resolve, reject) => {
    let result = [], items = 0
    const processSuccess = (index, val) => {
      result[index] = val
      if (++items === promises.length) {
        resolve(result)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let p = promises[i]
      if (p && typeof p.then === 'function') {
        p.then((data) => {
          processSuccess(i, data)
        }, reject)
      } else {
        processSuccess(i, data)
      }

    }
  })
}
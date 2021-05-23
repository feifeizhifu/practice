class Promise {
  constructor(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason - undefined;
    this.resolvecallback = [];
    this.rejectcallback = [];

    const resolve = (val) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = val;
        this.resolvecallback.forEach((fn) => fn());
      }
    };
    const reject = (val) => {
      if (this.status === "pending") {
        this.status = "reject";
        this.reason = val;
        this.rejectcallback.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(fulfilled, onReject) {
    fulfilled = typeof fulfilled === "function" ? fulfilled : (v) => v;
    onReject = typeof onReject === "function" ? onReject : (err) => err;
    let promise1 = new Promise((resolve, reject) => {
      if (this.status === "pending") {
        this.resolvecallback.push(() => {
          let val = fulfilled(this.value);

          handle(val, resolve, reject);
        });
        this.resolvecallback.push(() => {
          let val = onReject(this.reason);
          handle(val, resolve, reject);
        });
      }
      if (this.status === "fulfilled") {
        let val = fulfilled(this.value);
        handle(val, resolve, reject);
      }
      if (this.status === "reject") {
        let val = onReject(this.reason);
        handle(val, resolve, reject);
      }
    });
    return promise1;
  }
}
var handle = function (val, resolve, reject) {
  if (typeof val === "object" && typeof val !== null) {
    try {
      let fn = val.then;
      if (typeof fn === "function") {
        fn.call(
          val,
          (y) => {
            handle(y, resolve, reject);
          },
          (r) => {
            reject(r);
          }
        );
      }
    } catch (err) {
      reject(err);
    }
  } else {
    resolve(val);
  }
};

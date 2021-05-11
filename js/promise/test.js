// const Promise = require('./index')
new Promise((resolve, reject) => {
  resolve('fail')
}).then((res) => {
  console.log(res,1)
  throw Error('www')
  return 'success2'
}, (err => {
  console.log(err,3)
})).then((res) => {
  console.log(res,2)
}, (err => {
  console.log(err,4)
}))
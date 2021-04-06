# tree sharing
可以将无用模块“剪辑”，仅打包需要的
# teleport
# suspense
可以在嵌套层级中等待嵌套的异步依赖项
# custom renderer API
自定义渲染器API
用户可以尝试webgl 自定义渲染器
# proxy

# 基于vite 配置的vue3.0
- 基于浏览器原生ES imports的开发服务器（利用浏览器去解析imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用）
- 同时不仅有vue文件支持，还搞定热更新。而且热更新的速度不会随着模块的增多而变慢
组合式API 
setup 函数是一个新的组件选项，作为在组建内使用CompositionAPI的入口点
- 初始化props和beforeCreate之间调用
- 可以接受props和context
- this在setup()中不可用
#### ref
接受一个参数值并返回一个响应式且可改变的ref对象
- ref对象拥有一个指向内部值的单一属性 .value
- 当ref在模板中使用的时候，他会自动解套，无需再模板中额外书写 .value
- 构建响应式数据（一般处理简单值的响应式，但是对象也可以响应式）
- 原理 defineProperty 监听value值
```js
export default{
  setup{
    let supNum=ref(0),
        oppNum=ref(0)
    })
  }
  function change(type){
    type==='sup'?supNum.value++:oppNum.value++
  }
  return {
    supNum,
    oppNum，
    change
  }
}
```
#### reactive
接收一个普通对象然后返回该对象的响应式代理，等同于2.x的Vue observable()
- 基于proxy对数据进行深度的监听，以此构建响应式
- 响应式转换是深层的，会影响对象内部所有嵌套的属性
- 比Object.defineProperty好处在于 对于数据或者并未初始化的对象成员，都可以随意修改值，而且具备响应式的效果
#### toRef 
#### toRefs 
把reactive中的每一项变为ref响应式的数据
```js
export default{
  setup{
    let state=reactive({
      supNum:0,
      oppNum:0
    })
  }
  function change(type){
    type==='sup'?state.supNum++:state.oppNum++
  }
  return {
    ...toRefs(state),
    change
  }
}
```
#### isRef 检查一个值是否为ref对象
#### unRef 参数是一个ref则返回它的value，否则返回参数本身
#### readonly
传入一个对象（响应式或者普通）或ref，返回一个原始对象的只读代理
一个只读的代理是深层的,对象内部任何嵌套的属性都是只读的
```js
let obj=reactive({
  x:10,
  y:{
    z:10
  }
})
let obj1=readonly(obj)
obj1.y.z=100//=>警告Set operation on key "z" failed: target is readonly.
```
#### computed
传入一个getter函数，返回一个默认不可手动更改的ref对象
```js
const count=ref(1)
const plusOne=computed(()=>count++)
```
或者传入一个拥有get和set函数的对象，创建一个可手动修改的计算状态（todo）
```js
const count=ref(1)
const plusOne=computed({
  get()=>count.value++,
  set(val)=>{
    count.value=val-1
  }
})
```
### watchEffect 第一次会执行
立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数
```js
export default {
  props: ["title"],
  //初始化props和beforeCreate之间
  setup(props) {
    //props 基于proxy代理的响应式数据,不能进行解构，解构之后就不是响应式数据
    watchEffect(() => {
      console.log(props.title);
    });
  },
};
```
#### watch 第一次不执行
完全等效于2.x this.$watch
- watch需要侦听特定的数据源，并在回调函数中执行副作用
- 默认情况下是懒执行的，也就是说仅在侦听的源变化时才执行回调

```js
watch(
  state,
  ()=>{
    console.log(state.sup)
  }
)
//监听对象的某个属性
watch(
  ()=>state.sup,
  ()=>{
    console.log(state.sup)
  }
)
//可以同时监听多个值
watch([x,y],(val,prev)=>{
  //
})
```
#### refs
```vue
<template>
<div ref='root'></div>
</template>
<script>
import {ref,onMount} from 'vue'
export default{
  setup(){
    const root=ref(null)
    onMount(()=>{
      console.log(root.value)//<div ref='root'></div>
    })
    return {
      root
    }
  }
}
</script>
```
#### 生命周期
可以直接导入onXXXX 函数来注册生命周期钩子
- 这些生命周期钩子注册函数只能在setup()期间同步使用
- 在卸载组件时，生命周钩子内部同步创建的侦听器和计算状态也将删除
  + beforeMount --> onBeforeMount
  + mount -->onMount
  + beforeUpdate -->onBeforeUpdate
  + updated --> onUpdated
  + beforeDestroy -->onBeforeDestroy
  + errorCaptured --> onErrorCaptured
#### vue-router
```js
import {createRouter,createWebHashHistory} from 'vue-router'
const routes=[]
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),//createWebHistory
  routes, // `routes: routes` 的缩写
})

```
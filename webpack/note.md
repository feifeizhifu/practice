代码转换
文件优化 压缩
代码分割
模块合并
自动刷新
代码校验
自动发布
loader 模块转换器
plugin 扩展功能
webpack-cli 解析用户传递的参数
命令 npx webpack --mode development
webpack-merge 合并
loader 执行顺序 从上往下 从右往左
解析 css
css-loader 会解析 css 语法
style-loader 会将解析的 css 变成 style 标签插入到页面中
预处理器 scss node-sass sass-loader
less less less-loader
stylus stylus stylus-loader
css 添加前缀 需要 postcss-loader autoprefixer
默认会调用@babel/core 转化代码，转化的时候需要用@babel/preset-env 转化 es5
@babel/preset-env @babel/core @babel-loader
有两种方法转换 ts

1. ts-loader
2. babel7 @babel/preset-typescript

插件
purgecss-webpack-plugin glob 删除无用的 css
add-asset-html-cdn-webpack-plugin 管理引入的 cnd 链接
tree-shaking webpack 自带的（默认只支持 es6 语法 静态导入）只在生产环境下生效
package.json
"sideEffects":true 默认 如果 import 引入的变量没有使用，但是里面代码逻辑，就不会被 tree shaking
"sideEffects":false 移除副作用 如果 import 引入的变量没有使用就删除
"sideEffects":[ "**/*.css" ] 需要排除引入的 css 文件

##### scope hoisting webpack 自带

预计算
每个模块都是函数

##### dllPlugin 动态链接库

优化打包速度

#### import

原理就是 jsonp 动态导入

```js
import(/*webpackChunkName:'aaa'*/ "react").then((data) => {
  console.log(data);
});
```

//dllPlugin 不要和 splitchunks 共同使用
speed-measure-webpack-plugin 速度分析插件

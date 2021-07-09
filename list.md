## 网络层面=》如何让资源体积更小加载更快

构建策略：基于构建工具(Webpack/Rollup/Parcel/Esbuild/Vite/Gulp)
图像策略：基于图像类型(JPG/PNG/SVG/WebP/Base64)
分发策略：基于内容分发网络(CDN)
缓存策略：基于浏览器缓存(强缓存/协商缓存)

1. 构建策略
   减少打包时间：缩减范围（配置 include/exclude 缩小 Loader 对文件的搜索范围）、缓存副本（配置 cache 缓存 Loader 对文件的编译副本，再次编译时只编译修改过的文件）、定向搜索（配置 resolve 提高文件的搜索速度）、提前构建（配置 DllPlugin 将第三方依赖提前打包）、并行构建（配置 Thread 将 Loader 单进程转换为多进程）、可视结构
   减少打包体积：分割代码（splitChunks）、摇树优化（移除重复代码和未使用代码，只对 es6 生效）、动态垫片（@babel/preset-env 提供的 useBuiltIns 可按需导入 Polyfill）、按需加载（import @babel/plugin-syntax-dynamic-import）、作用提升、压缩资源

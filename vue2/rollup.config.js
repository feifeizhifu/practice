import babel from "rollup-plugin-babel";
export default {
  input: "./src/index.js",
  output: {
    format: "umd", //支持amd和commonjs规范
    name: "Vue", //全局下暴露window.Vue
    file: "dist/vue.js",
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**", //glob语法
    }),
  ],
};

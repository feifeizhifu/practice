const path = require("path");
const DllPlugin = require("webpack").DllPlugin;
module.exports = {
  mode: "development",
  entry: ["react", "react-dom"],
  output: {
    library: "react", //打包后接受自执行函数的名字叫
    //libraryTarget: "commonjs", //默认用var   umd this var module.export
    filename: "react.dll.js",
    path: path.resolve(__dirname, "dll"),
  },
  plugins: [
    new DllPlugin({
      name: "react",
      path: path.resolve(__dirname, "dll/manifest.json"),
    }),
  ],
};

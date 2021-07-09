const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    compress: true, //gzip可以提升返回页面的速度
    contentBase: path.resolve(__dirname, "../dist"),
  },
  plugins: [],
};

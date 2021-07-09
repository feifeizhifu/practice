const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); //会压缩css文件，但使用了这个插件，js文件就需要自己手动压缩
const TerserWebpackPlugin = require("terser-webpack-plugin"); //压缩js
module.exports = {
  mode: "production",
  optimization: {
    minimizer: [
      //可以放置压缩方案
      new optimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ],
  },
};

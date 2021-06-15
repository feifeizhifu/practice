const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    port: 9000,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            loaders: {
              less: ["vue-style-loader", "css-loader", "sass-loader"],
            },
          },
        },
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: ["babel-loader"],
      // },
      {
        test: /\.sass|css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};

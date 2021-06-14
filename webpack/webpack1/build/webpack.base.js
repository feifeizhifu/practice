const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); //每次打包之前清除输出的目录
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin-webpack4");
module.exports = (env) => {
  let isDev = env.development;
  const base = {
    entry: path.resolve(__dirname, "../src/index.ts"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../dist"),
    },
    module: {
      //转化文件 loader写法：[],'',{}
      //css想要和html一同加载 mini-css-extract-plugin
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
        // {
        //   test: /\.js$/,
        //   use: "babel-loader",
        // },

        {
          test: /\.tsx?$/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                //给loader传递参数，如果css文件引入其他文件@import
                importLoaders: 2,
              },
            },
            "postcss-loader",
            "less-loader",
          ],
        },
        // {匹配到scss结尾的使用sass-loader 来调用node-sass处理sass文件
        //   test: /\.css$/,
        //   use: ["style-loader", "css-loader","sass-loader"],
        // },
        // {
        //   test: /\.less$/,
        //   use: ["style-loader", "css-loader", "less-loader"],
        // },
        {
          test: /\.(woff|tff|eot|svg)$/,
          use: "file-loader",
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: {
            loader: "url-loader",
            //如果大于100kb,会用"file-loader"
            options: {
              name: "image/[contentHash].[ext]",
              limit: 30 * 1024,
            },
          }, //file-loader拷贝的作用
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      !isDev &&
        new MiniCssExtractPlugin({
          //如果是开发环境需要使用抽离样式文件,可以和js并行加载
          filename: "css/index.css",
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
        filename: "index.html",
        minify: !isDev && {
          removeAttributeQuotes: true, //双引号去掉
          collapseWhitespace: true, //压缩一行
        },
      }),
    ].filter(Boolean),
  };
  if (isDev) {
    return merge(base, dev);
  } else {
    return merge(base, prod);
  }
};

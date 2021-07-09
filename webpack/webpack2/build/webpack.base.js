const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); //每次打包之前清除输出的目录
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
//删除css无用代码，配合mini-css-extract-plugin使用
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");
// glob.sync("../src/**/*", {nodir: true});
//当cdn链接引入多个时，可以使用该插件去维护
const AddCdnPlugin = require("add-asset-html-cdn-webpack-plugin");
const DllReferencePlugin = require("webpack").DllReferencePlugin;
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
module.exports = (env) => {
  let isDev = env.development;
  const base = {
    entry: {
      aaa: path.resolve(__dirname, "../src/index.js"),
    },
    //在生产环境下，将第三方包进行抽离 todo
    // optimization: {
    //   splitChunks: {
    //     chunks: "async", //默认支持异步代码分割
    //     minSize: 20000, //文件超过2kb，就会抽离
    //     minRemainingSize: 0,
    //     minChunks: 1, //最少模块引用一次才抽离
    //     maxAsyncRequests: 30,
    //     maxInitialRequests: 30,
    //     enforceSizeThreshold: 50000,
    //     cacheGroups: {
    //       defaultVendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -10,
    //         reuseExistingChunk: true,
    //       },
    //       default: {
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true,
    //       },
    //     },
    //   },
    // },
    output: {
      filename: "[name].js", //同步打包的名字
      chunkFilename: "[name].min.js", //异步
      path: path.resolve(__dirname, "../dist"),
    },
    externals: {
      jquery: "$", //引用外部变量时，不去打包代码中的jquery
    },
    module: {
      rules: [
        {
          test: /\.js$/,
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
            // "less-loader",
          ],
        },
        {
          test: /\.(woff|tff|eot|svg)$/,
          use: "file-loader",
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: "file-loader",
            },
            {
              //可以在使用file-loader之前，对图片进行压缩
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        }, //file-loader拷贝的作用
        // {
        //   test: /\.(jpe?g|png|gif)$/,
        //   use: {
        //     loader: "url-loader",
        //     //如果大于100kb,会用"file-loader"
        //     options: {
        //       name: "image/[contentHash].[ext]",
        //       limit: 30 * 1024,
        //     },
        //   }, //file-loader拷贝的作用
        // },
      ],
    },
    plugins: [
      // new PurgecssWebpackPlugin({
      //   paths: glob.sync("../src/**/*", {nodir: true}), //查找文件目录
      // }),

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
        //chunksSortMode:'manual',//手动按照我的顺序引入
        //chunks:['b','a']//打包的js文件顺序
      }),
      new AddCdnPlugin(true, {
        jquery: "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.slim.js",
      }),
      new DllReferencePlugin({
        manifest: path.resolve(__dirname, "../dll/manifest.json"),
      }),
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, "../dll/react.dll.js"),
      }),
      new BundleAnalyzerPlugin(),
    ].filter(Boolean),
  };
  if (isDev) {
    return merge(base, dev);
  } else {
    return merge(base, prod);
  }
};

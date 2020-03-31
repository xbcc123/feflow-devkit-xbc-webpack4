"use strict";

var merge = require("webpack-merge");

var webpack = require("webpack");

var path = require("path");

var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

var baseConfig = require("./webpack.base.config");

var projectRoot = process.cwd();
var devConfig = {
  mode: "development",
  module: {
    rules: [// {
      //   test: /\.css$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         // modules: true,
      //         localIdentName: "[name]__[local]--[hash:base64:5]"
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         // modules: true,
      //         localIdentName: "[name]__[local]--[hash:base64:5]"
      //       }
      //     },
      //     "less-loader"
      //   ]
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         // modules: true,
      //         localIdentName: "[name]__[local]--[hash:base64:5]"
      //       }
      //     },
      //     "sass-loader",
      //     "postcss-loader"
      //   ]
      // },
      // {
      //   test: /\.sty(l|lus)$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         // modules: true,
      //         localIdentName: "[name]__[local]--[hash:base64:5]"
      //       }
      //     },
      //     "stylus-loader"
      //   ]
      // }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin(), new webpack.NoEmitOnErrorsPlugin(), new FriendlyErrorsWebpackPlugin()],
  devServer: {
    contentBase: [path.join(projectRoot, "./dist")],
    hot: true,
    host: "0.0.0.0",
    // port: 8888,
    useLocalIp: true,
    // compress: true,
    clientLogLevel: "warning",
    stats: "errors-only",
    noInfo: true,
    // https: true,
    // quiet: true,
    open: true,
    overlay: false,
    // overlay: {
    //   warnings: true,
    //   errors: false
    // },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 100,
      poll: 1000
    }
  },
  // devServer: {
  //   contentBase: "./dist",
  //   hot: true,
  //   stats: "errors-only"
  // },
  devtool: "cheap-module-eval-source-map"
};
module.exports = merge(baseConfig, devConfig);
"use strict";

var cssnano = require("cssnano");

var merge = require("webpack-merge");

var TerserPlugin = require("terser-webpack-plugin");

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var baseConfig = require("./webpack.base.config");

var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

var CompressionPlugin = require("compression-webpack-plugin"); // const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


var prodConfig = {
  mode: "production",
  devtool: false,
  module: {
    rules: [// {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
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
      //     MiniCssExtractPlugin.loader,
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
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {
      //         // modules: true,
      //         localIdentName: "[name]__[local]--[hash:base64:5]"
      //       }
      //     },
      //     "sass-loader"
      //   ]
      // },
      // {
      //   test: /\.sty(l|lus)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         localIdentName: "[name]__[local]--[hash:base64:5]"
      //       }
      //     },
      //     "stylus-loader"
      //   ]
      // }
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: "static/css/[name].[contenthash].css"
  }) // new CompressionPlugin({
  //   asset: "[path].gz[query]",
  //   algorithm: "gzip",
  //   test: /\.(js|html)$/,
  //   threshold: 10240,
  //   minRatio: 0
  // }),
  // new BundleAnalyzerPlugin()
  // new OptimizeCSSAssetsPlugin({
  //   assetNameRegExp: /\.css$/g,
  //   cssProcessor: cssnano,
  // }),
  // new HtmlWebpackExternalsPlugin({
  //   externals: [
  //     {
  //       module: 'react',
  //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
  //       global: 'React',
  //     },
  //     {
  //       module: 'react-dom',
  //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
  //       global: 'ReactDOM',
  //     },
  //   ],
  // }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        vendor: {// node_modules内的依赖库
          // chunks: "initial", // initial all async
          // test: /[\\/]node_modules[\\/]/,
          // name: "vendor",
          // minChunks: 2, //被不同entry引用次数(import),1次的话没必要提取
          // maxInitialRequests: 5, // 入口点最大请求数量
          // // maxAsyncRequests: 3, // 按需加载时并行请求的最大数量
          // minSize: 0,
          // maxSize: 400 * 1024,
          // priority: 100,
          // reuseExistingChunk: true
        },
        common: {
          // ‘src/js’ 下的js文件
          chunks: "all",
          test: /[\\/]skyConfig[\\/]/,
          //也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
          name: "common",
          //生成文件名，依据output规则
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          maxSize: 80 * 1024,
          priority: 1,
          reuseExistingChunk: true
        },
        "public": {
          // ‘src/js’ 下的js文件
          chunks: "initial",
          test: /[\\/]publicResource[\\/]publicUtils[\\/]/,
          //也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
          name: "public",
          //生成文件名，依据output规则
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          maxSize: 80 * 1024,
          priority: 1,
          reuseExistingChunk: true
        },
        router: {
          // ‘src/js’ 下的js文件
          chunks: "all",
          test: /[\\/]router[\\/]/,
          //也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
          name: "public",
          //生成文件名，依据output规则
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          maxSize: 80 * 1024,
          priority: 1,
          reuseExistingChunk: true
        },
        store: {
          // ‘src/js’ 下的js文件
          chunks: "all",
          test: /[\\/]store[\\/]/,
          //也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
          name: "public",
          //生成文件名，依据output规则
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          maxSize: 80 * 1024,
          priority: 1,
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      // compress: true,
      // mangle: true,
      cache: true,
      parallel: true,
      terserOptions: {
        ecma: undefined,
        warnings: false,
        parse: {},
        compress: {},
        mangle: true,
        // Note `mangle.properties` is `false` by default.
        module: false,
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false
      }
    }), new OptimizeCSSAssetsPlugin({
      // 压缩css
      cssProcessorOptions: {
        safe: true
      }
    })]
  } // optimization: {
  //   splitChunks: {
  //     minSize: 0,
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "all",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // }

};
module.exports = merge(baseConfig, prodConfig);
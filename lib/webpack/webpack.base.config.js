"use strict";

var autoprefixer = require("autoprefixer");

var glob = require("glob");

var path = require("path");

var webpack = require("webpack");

var _require = require("clean-webpack-plugin"),
    CleanWebpackPlugin = _require.CleanWebpackPlugin;

var HtmlWebpackPlugin = require("html-webpack-plugin"); // const MiniCssExtractPlugin = require('mini-css-extract-plugin');


var CopyWebpackPlugin = require("copy-webpack-plugin");

var VueLoaderPlugin = require("vue-loader/lib/plugin"); // const threadLoader = require("thread-loader");


var projectRoot = process.cwd(); // 设置多页配置
// const setMPA = () => {
//   const entry = {};
//   const htmlWebpackPlugins = [];
//   const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
//   Object.keys(entryFiles)
//     .map((index) => {
//       const entryFile = entryFiles[index];
//       const match = entryFile.match(/src\/(.*)\/index\.js/);
//       const pageName = match && match[1];
//       entry[pageName] = entryFile;
//       return htmlWebpackPlugins.push(
//         new HtmlWebpackPlugin({
//           inlineSource: '.css$',
//           template: path.join(projectRoot, `./src/${pageName}/index.html`),
//           filename: `${pageName}.html`,
//           chunks: ['vendors', pageName],
//           inject: true,
//           minify: {
//             html5: true,
//             collapseWhitespace: true,
//             preserveLineBreaks: false,
//             minifyCSS: true,
//             minifyJS: true,
//             removeComments: false,
//           },
//         })
//       );
//     });
//   return {
//     entry,
//     htmlWebpackPlugins,
//   };
// };
// const { entry, htmlWebpackPlugins } = setMPA();
// const entry = ['@babel/polyfill', path.join(projectRoot, "./src/index.js")]; 

var entry = path.join(projectRoot, "./src/index.js"); // console.log(__dirname)

module.exports = {
  context: path.join(projectRoot, "./"),
  entry: entry,
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "static/js/[name].[hash].bundle.js",
    chunkFilename: "static/js/[name].[chunkhash].bundle.js",
    pathinfo: false,
    publicPath: "/"
  },
  // output: {
  //   path: path.resolve(__dirname, "../dist"),
  //   filename: "static/js/[name].[hash].bundle.js",
  //   chunkFilename: "static/js/[name].[chunkhash].bundle.js",
  //   pathinfo: false,
  //   publicPath: "/"
  // },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    antd: "antd",
    "element-ui": "ELEMENT",
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    jquery: "$",
    moment: "moment",
    "mint-ui": "MINT",
    "crypto-js": "CryptoJS",
    lodash: "_"
  },
  resolveLoader: {
    // modules: ["node_modules"]
    modules: [path.resolve(__dirname, "../../node_modules"), path.join(projectRoot, "node_modules")]
  },
  resolve: {
    extensions: [".ts", ".js", "jsx", ".tsx", ".json", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      app: path.join(projectRoot, "./src/app.js"),
      "@": path.join(projectRoot, "./src") // "$pRoot": path.join(projectRoot, "./publicResource"),
      // "$pRootBC": path.join(projectRoot, "./publicResource/publicBasicsComponents"),
      // "$pRootBuC": path.join(projectRoot, "./publicResource/publicBusinessComponents"),
      // "$pRootStatic": path.join(projectRoot, "./publicResource/publicStatic"),
      // "$pRootUtils": path.join(projectRoot, "./publicResource/publicUtils"),
      // '$pRoot': resolve('publicResource'),
      // '$pRootBC': resolve('publicResource/publicBasicsComponents'),
      // '$pRootBuC': resolve('publicResource/publicBusinessComponents'),
      // '$pRootStatic': resolve('publicResource/publicStatic'),
      // '$pRootUtils': resolve('publicResource/publicUtils'),

    },
    mainFiles: ["index"],
    // modules: ["node_modules"],
    modules: [path.resolve(__dirname, "../../node_modules"), path.join(projectRoot, "node_modules")]
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: "cache-loader"
      }, {
        loader: "vue-loader"
      }]
    }, {
      test: /\.js$/,
      exclude: [path.join(projectRoot, "node_modules"), path.resolve(__dirname, "../../node_modules")],
      use: [{
        loader: "thread-loader"
      }, {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          compact: false
        }
      }]
    }, {
      test: /\.(j|t)sx?$/,
      use: [{
        loader: "thread-loader"
      }, {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          compact: false
        }
      }],
      exclude: [path.join(projectRoot, "node_modules"), path.resolve(__dirname, "../../node_modules")]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 8192,
          esModule: false,
          // 这里设置为false
          name: "static/img/[name].[hash:7].[ext]" // publicPath: path.join(projectRoot, "dist")

        }
      }]
    }, {
      // test: /\.(woff|woff2|eot|ttf|otf)$/,
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 8192,
          esModule: false,
          // 这里设置为false
          name: "static/fonts/[name].[hash:7].[ext]" // publicPath: path.join(projectRoot, "dist")

        }
      }]
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 8192,
          esModule: false,
          // 这里设置为false
          name: "static/media/[name].[hash:7].[ext]" // publicPath: path.join(projectRoot, "dist")

        }
      }]
    }]
  },
  plugins: [// new MiniCssExtractPlugin({
  //   filename: "[name]_[contenthash:8].css"
  // }),
  new VueLoaderPlugin(), new CleanWebpackPlugin(), new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(projectRoot, "index.html") // inject: true,

  }), new CopyWebpackPlugin([{
    from: path.join(projectRoot, "./static"),
    to: "static",
    ignore: [".*"]
  }]) // new webpack.DllReferencePlugin({
  //     context: path.join(__dirname),
  //     manifest: require("./vendor-manifest.json"),
  // }),
  ] //   function errorPlugin() {
  //     this.hooks.done.tap('done', (stats) => {
  //       if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
  //         process.exit(1);
  //       }
  //     });
  //   },
  // ].concat(htmlWebpackPlugins)

};
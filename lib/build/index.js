"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _webpack = _interopRequireDefault(require("webpack"));

var _fs = _interopRequireDefault(require("fs"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _htmlWebpackExternalsPlugin = _interopRequireDefault(require("html-webpack-externals-plugin"));

var _webpackSubresourceIntegrity = _interopRequireDefault(require("webpack-subresource-integrity"));

var _offlineWebpackPlugin = _interopRequireDefault(require("offline-webpack-plugin"));

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var _stringReplaceWebpackPlugin = _interopRequireDefault(require("string-replace-webpack-plugin"));

var _htmlInlineCssWebpackPlugin = _interopRequireDefault(require("html-inline-css-webpack-plugin"));

var _optimizeCssAssetsWebpackPlugin = _interopRequireDefault(require("optimize-css-assets-webpack-plugin"));

var _index = require("../tools/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// import Config from "./config";
var webpackMerge = require("webpack-merge");

function getPath(filename) {
  var currDir = process.cwd();

  while (!_fs["default"].existsSync(_path["default"].join(currDir, filename))) {
    currDir = _path["default"].join(currDir, "../"); // unix跟目录为/， win32系统根目录为 C:\\格式的

    if (currDir === "/" || /^[a-zA-Z]:\\$/.test(currDir)) {
      return "";
    }
  }

  return currDir;
} // 当前运行的时候的根目录


var projectRoot = getPath(".feflowrc.json"); // if (!projectRoot) {
//     projectRoot = getPath('feflow.js');
// }
// 最基础的配置
// const baseConfig = {
//   target: "web",
//   cache: true,
//   // entry: glob.sync(path.join(projectRoot, "./src/pages/*")),
//   entry: path.join(projectRoot, './src/index.js'),
//   module: {
//     rules: []
//   },
//   output: "",
//   plugins: [],
//   resolve: {
//     alias: glob.sync(path.join(projectRoot, "./src/*/")) // 支持Webpack import绝对路径的写法
//   },
//   resolveLoader: {},
//   // 对体积过大的包进行提示
//   performance: {
//     hints: "warning", // enum
//     maxAssetSize: 200000, // int (in bytes),
//     maxEntrypointSize: 400000, // int (in bytes)
//     assetFilter: function(assetFilename) {
//       // Function predicate that provides asset filenames
//       return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
//     }
//   }
// };

var baseConfig = {
  module: {// rules: []
  },
  resolve: {}
};

var Builder = /*#__PURE__*/function () {
  function Builder() {
    _classCallCheck(this, Builder);
  }

  _createClass(Builder, [{
    key: "createDevConfig",
    // 创建dev配置
    value: function createDevConfig(options) {
      var devConfig = (0, _index.deepCopy)(baseConfig);
      devConfig.mode = "development"; // 设置打包规则

      var devRules = []; // 设置HTML解析规则
      // devRules.push(this.setHtmlRule());
      // 设置图片解析规则
      // devRules.push(this.setImgRule(false));
      // 设置CSS解析规则  isMinicss是否开启css抽离  isModule是否开启css Modules

      devRules.push(this.setCssRule(options.isModule, options.isMinicss)); // 设置less

      devRules.push(this.setLessRule(options.isModule, options.isMinicss)); // 设置scss

      devRules.push(this.setSassRule(options.isModule, options.isMinicss)); // 设置stylus

      devRules.push(this.setStylusRule(options.isModule, options.isMinicss)); // 设置使用CSS Modules的CSS解析规则
      // devRules.push(this.setCssModulesRule());
      // 设置Less解析规则，开发环境开启css-hot-loader
      // devRules.push(
      //   this.setLessRule(
      //     true,
      //     options.usePx2rem,
      //     options.remUnit,
      //     options.remPrecision
      //   )
      // );
      // 设置使用CSS Modules的Less解析规则，开发环境开启css-hot-loader
      // devRules.push(
      //   this.setLessModulesRule(
      //     true,
      //     options.usePx2rem,
      //     options.remUnit,
      //     options.remPrecision
      //   )
      // );
      // 设置JS解析规则
      // devRules.push(this.setJsRule(options.babelrcPath));
      // 设置TS解析规则
      // devRules.push(this.setTsRule());
      // 设置字体解析规则
      // devRules.push(this.setFontRule());
      // 设置打包插件

      var devPlugins = []; // devPlugins.push(new StringReplaceWebpackPlugin());
      // 设置提取CSS为一个单独的文件的插件

      if (options.isMinicss) {
        devPlugins.push(this.setMiniCssExtractPlugin());
        devPlugins.push(this.setOptimizeCssAssetsPlugin());
      } // devPlugins.push(this.setMiniCssExtractPlugin(false, ""));
      // if (options.useReact !== false) {
      //   // React, react-dom 通过cdn引入
      //   devPlugins.push(this.setExternalPlugin(options.externals));
      // }
      // 增加热更新组件
      // devPlugins.push(new webpack.HotModuleReplacementPlugin());
      // 抽离公共js
      // devPlugins.push(this.setCommonsChunkPlugin());
      // 多页面打包
      // 开发环境不使用inlineCss，保证css热更新功能
      // const {
      //   newEntry,
      //   htmlWebpackPlugins,
      //   cssInlinePlugins
      // } = this.setMultiplePage(
      //   devConfig.entry,
      //   false,
      //   options.inject,
      //   false,
      //   "",
      //   ""
      // );
      // devPlugins = devPlugins.concat(htmlWebpackPlugins, cssInlinePlugins);
      // devConfig.entry = newEntry;
      // 开发阶段增加sourcemap.


      devConfig.devtool = "inline-source-map"; // 这里还是依然按照原来的配置，将静态资源用根目录伺服
      // devConfig.output = this.setOutput(false, "", "/", options.outDir);

      devConfig.module.rules = devRules;
      devConfig.plugins = devPlugins; // 设置启动服务端口号 本地服务配置

      devConfig.devServer = this.setDevServer(options.port || 1234); // devConfig.resolve.alias = this.setAlias(options.alias);
      // devConfig.resolve.extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];
      // 设置 loader 的npm包查找的相对路径，包括本地node_modules、.feflow、测试环境的node_module
      // devConfig.resolveLoader = this.setResolveLoaderPath(options.runtime);
      // return devConfig

      return webpackMerge(this.mixCreateConfig(options), devConfig);
    } // 创建prod配置

  }, {
    key: "createProdConfig",
    value: function createProdConfig(options) {
      var prodConfig = (0, _index.deepCopy)(baseConfig); // const bizName: string | undefined = options.bizName;
      // const moduleName: string | undefined = options.moduleName;
      // 业务域名
      // const domain: string = options.domain || "now.qq.com";
      // const cdn: string = options.cdn || "11.url.cn";
      // const product: string = options.product || "now";
      // Html 路径前缀, 打包时的目录
      // const htmlPrefix: string = moduleName
      //   ? `../../webserver/${bizName}`
      //   : "../webserver";
      // // Css, Js, Img等静态资源路径前缀, 打包时的目录
      // const assetsPrefix: string = moduleName ? `cdn/${bizName}` : "cdn";
      // const cdnUrl: string = moduleName
      //   ? `//${cdn}/${product}/${moduleName}/${bizName}`
      //   : `//${cdn}/${product}/${bizName}`;
      // const serverUrl: string = moduleName
      //   ? `//${domain}/${moduleName}/${bizName}`
      //   : `//${domain}/${bizName}`;
      // const regex = new RegExp(assetsPrefix + '/', 'g');
      // 设置打包规则

      var prodRulesx = []; // // 设置HTML解析规则
      // prodRules.push(this.setHtmlRule());
      // // 设置图片解析规则, 图片需要hash
      // prodRules.push(this.setImgRule(true, ""));
      // 设置CSS解析规则  isMinicss是否开启css抽离  isModule是否开启css Modules

      prodRules.push(this.setCssRule(options.isModule, options.isMinicss)); // 设置less

      prodRules.push(this.setLessRule(options.isModule, options.isMinicss)); // 设置scss

      prodRules.push(this.setSassRule(options.isModule, options.isMinicss)); // 设置stylus

      prodRules.push(this.setStylusRule(options.isModule, options.isMinicss)); // // 设置JS解析规则
      // prodRules.push(this.setJsRule(options.babelrcPath));
      // // 设置TS解析规则
      // prodRules.push(this.setTsRule());
      // // 设置字体解析规则
      // prodRules.push(this.setFontRule());
      // 设置打包插件

      var prodPlugins = []; // 清空Public目录插件, https://github.com/johnagan/clean-webpack-plugin/issues/17
      // prodPlugins.push(
      //   new CleanWebpackPlugin([options.outDir], {
      //     root: projectRoot,
      //     verbose: true,
      //     dry: false
      //   })
      // );
      // prodPlugins.push(new StringReplaceWebpackPlugin());
      // 设置提取CSS为一个单独的文件的插件

      if (options.isMinicss) {
        prodPlugins.push(this.setMiniCssExtractPlugin());
        prodPlugins.push(this.setOptimizeCssAssetsPlugin());
      } // prodPlugins.push(this.setMiniCssExtractPlugin(true, ""));
      // prodPlugins.push(this.setOptimizeCssAssetsPlugin());
      // if (options.minifyJS) {
      //   // 压缩JS
      //   // webpack4 mode=production 下会默认启动 terser-webpack-plugin
      // }
      // if (options.useReact !== false) {
      //   // React, react-dom 通过cdn引入
      //   prodPlugins.push(this.setExternalPlugin(options.externals));
      // }
      // 抽离公共js

      /**
       * 这个地方应当支持配置
       */
      //prodPlugins.push(this.setCommonsChunkPlugin());
      // 支持Fis3的 inline 语法糖 多页面打包, 默认压缩html
      // const {
      //   newEntry,
      //   htmlWebpackPlugins,
      //   cssInlinePlugins
      // } = this.setMultiplePage(
      //   prodConfig.entry,
      //   options.minifyHTML,
      //   options.inject,
      //   options.inlineCSS,
      //   assetsPrefix,
      //   htmlPrefix
      // );
      // prodPlugins = prodPlugins.concat(htmlWebpackPlugins, cssInlinePlugins);
      // if (options.useSri !== false) {
      //   // 给生成出来的js bundle增加跨域头(cross-origin)，便于错误日志记录
      //   prodPlugins.push(this.setSriPlugin());
      // }
      // prodPlugins.push(
      //   this.setOffline(
      //     assetsPrefix,
      //     htmlPrefix,
      //     cdnUrl,
      //     serverUrl,
      //     domain,
      //     cdn,
      //     product,
      //     options.outDir
      //   )
      // );
      // prodConfig.entry = newEntry;
      // prodConfig.output = this.setOutput(
      //   true,
      //   assetsPrefix,
      //   cdnUrl + "/",
      //   options.outDir
      // );


      prodConfig.module.rules = prodRules;
      prodConfig.plugins = prodPlugins; // prodConfig.bail = true;
      // prodConfig.resolve.alias = this.setAlias(options.alias);
      // prodConfig.resolve.extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];
      // 设置 loader 的npm包查找的相对路径，此处设置在全局的 .feflow 目录下
      // prodConfig.resolveLoader = this.setResolveLoaderPath(options.runtime);
      // return prodConfig

      return webpackMerge(this.mixCreateConfig(options), prodConfig);
    } // 公用配置

  }, {
    key: "mixCreateConfig",
    value: function mixCreateConfig(options) {
      var mixConfig = (0, _index.deepCopy)(baseConfig); // 设置打包规则

      var minRules = []; // 设置打包插件

      var mixPlugins = []; // 环境变量配置

      mixPlugins.push(this.setDefinePlugin(options.envs, options.currentEnv)); // 是否启动打包性能分析

      if (options.hasAnalyzer) {
        mixPlugins.push(this.setBundleSnalyzerPlugin(options.analyzerOptions));
      }

      mixConfig.entry = this.setEntry(options.entry);
      mixConfig.resolve.alias = this.setAlias(options.alias);
      mixConfig.resolve.extensions = [];
      mixConfig.module.rules = minRules;
      mixConfig.plugins = mixPlugins;
      return mixConfig;
    }
  }, {
    key: "setBundleSnalyzerPlugin",
    value: function setBundleSnalyzerPlugin(analyzerOptions) {
      if (!analyzerOptions || JSON.stringify(analyzerOptions) === '{}') {
        analyzerOptions = {
          analyzerPort: "4321"
        };
      }

      return new BundleAnalyzerPlugin(analyzerOptions);
    } // 设置别名

  }, {
    key: "setAlias",
    value: function setAlias(alias) {
      var aliasObj = {};

      if (Object.prototype.toString.call(alias) !== "[object Object]") {
        return aliasObj;
      }

      for (var key in alias) {
        aliasObj[key] = _path["default"].join(projectRoot, "".concat(alias[key]));
      }

      return aliasObj;
    } // 设置入口

  }, {
    key: "setEntry",
    value: function setEntry(entry) {
      return _path["default"].join(projectRoot, "./src/".concat(entry));
    } // isMinicss 是否开启css抽离  isModule 是否开启css Modules

  }, {
    key: "setCssRule",
    value: function setCssRule(isModule, isMinicss) {
      // console.log(isModule)
      return {
        test: /\.css$/,
        use: [isMinicss ? _miniCssExtractPlugin["default"].loader : "style-loader", {
          loader: "css-loader",
          options: {
            modules: isModule ? {
              mode: 'local',
              exportGlobals: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            } : false
          }
        }]
      };
    }
  }, {
    key: "setLessRule",
    value: function setLessRule(isModule, isMinicss) {
      return {
        test: /\.less$/,
        use: [isMinicss ? _miniCssExtractPlugin["default"].loader : "style-loader", {
          loader: "css-loader",
          options: {
            modules: isModule ? {
              mode: 'local',
              exportGlobals: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            } : false
          }
        }, "less-loader"]
      };
    }
  }, {
    key: "setSassRule",
    value: function setSassRule(isModule, isMinicss) {
      return {
        test: /\.scss$/,
        use: [isMinicss ? _miniCssExtractPlugin["default"].loader : "style-loader", {
          loader: "css-loader",
          options: {
            modules: isModule ? {
              mode: 'local',
              exportGlobals: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            } : false
          }
        }, "sass-loader"]
      };
    }
  }, {
    key: "setStylusRule",
    value: function setStylusRule(isModule, isMinicss) {
      return {
        test: /\.sty(l|lus)$/,
        use: [isMinicss ? _miniCssExtractPlugin["default"].loader : "style-loader", {
          loader: "css-loader",
          options: {
            modules: isModule ? {
              mode: 'local',
              exportGlobals: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            } : false
          }
        }, "stylus-loader"]
      };
    }
  }, {
    key: "setMiniCssExtractPlugin",
    value: function setMiniCssExtractPlugin() {
      return new _miniCssExtractPlugin["default"]({
        filename: "static/css/[name].[contenthash].css"
      });
    }
  }, {
    key: "setOptimizeCssAssetsPlugin",
    value: function setOptimizeCssAssetsPlugin() {
      return new _optimizeCssAssetsWebpackPlugin["default"]({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano")
      });
    }
  }, {
    key: "setDevServer",
    value: function setDevServer(port) {
      return {
        // contentBase: path.join(projectRoot, './src'),
        // inline: true,
        // historyApiFallback: false,
        // disableHostCheck: true,
        port: port
      };
    }
  }, {
    key: "setDefinePlugin",
    value: function setDefinePlugin(envs, currentEnv) {
      // console.log(envs[currentEnv].envObj);
      return new _webpack["default"].DefinePlugin({
        "process.env": envs[currentEnv].envObj
      });
    }
  }]);

  return Builder;
}();

var _default = Builder;
exports["default"] = _default;
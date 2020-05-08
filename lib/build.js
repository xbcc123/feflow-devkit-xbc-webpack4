"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _index = _interopRequireDefault(require("./build/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var webpack = require("webpack");

var ora = require('ora');

var chalk = require('chalk');

var currentConfig = require("./webpack/webpack.prod.config");

var merge = require("webpack-merge");

var config = {},
    importConfig = {};
var build = new _index["default"](); // 将公共配置绑定到各个环境

function setSingleConfig(options) {
  for (var key in options.devkit.commands) {
    // 单独配置的选项会覆盖公共配置
    var single = Object.assign(options.devkit.commons, options.devkit.commands[key].options); // 设置当前当前执行的环境变量

    single.currentEnv = key;
    Object.assign(options.devkit.commands[key].options, single);
  }

  return options;
} // 获取配置的config


function getConfig(options, env) {
  options = setSingleConfig(options);
  return options.devkit.commands[env].options;
}
/**
  * @function run
  * @desc     创建用于开发过程中的webpack打包配置
  *
  * @param {Object}  options                         参数
  * @param {Boolean} options.name               是否启用px2rem
  *
  * @example
  */


function run(ctx, options) {
  importConfig = getConfig(ctx.projectConfig, options.env); // console.log(importConfig)

  config = merge(currentConfig, build.createDevConfig(importConfig)); // console.log(config);
  // webpack(config, (err, stats) => {
  //   if (err) {
  //       console.log(err);
  //   }
  //   console.log(
  //       stats.toString({
  //         chunks: false,
  //         colors: true,
  //         children: false
  //       })
  //   );
  // });

  var spinner = ora(chalk.yellow('项目正在打包 请稍候...'));
  spinner.start();
  webpack(config, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      publicPath: true,
      entrypoints: true,
      colors: true,
      assets: false,
      // 隐藏打包资源名称
      modules: false,
      children: false,
      // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false,
      builtAt: true,
      // 添加构建日期和构建时间信息
      cached: true // 添加缓存（但未构建）模块的信息
      // cachedAssets: true,  // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）

    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n')); // console.log(chalk.yellow(
    //   '  Tip: built files are meant to be served over an HTTP server.\n' +
    //   '  Opening index.html over file:// won\'t work.\n'
    // ))
  });
}
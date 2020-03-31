"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _index = _interopRequireDefault(require("./build/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var webpack = require("webpack");

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
  importConfig = getConfig(ctx.projectConfig, options.env);
  console.log(importConfig);
  config = merge(currentConfig, build.createDevConfig(importConfig)); // console.log(config);

  webpack(config, function (err, stats) {
    if (err) {
      console.log(err);
    }

    console.log(stats.toString({
      chunks: false,
      colors: true,
      children: false
    }));
  });
}
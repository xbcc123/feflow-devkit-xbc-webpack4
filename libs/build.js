const webpack = require("webpack");
const currentConfig = require("./webpack/webpack.prod.config");
const merge = require("webpack-merge");
let config = {},
  importConfig = {};

import Builder from "./build/index.js";
let build = new Builder();

// 将公共配置绑定到各个环境
function setSingleConfig(options) {
  for(let key in options.devkit.commands) {
    // 单独配置的选项会覆盖公共配置
    let single = Object.assign(options.devkit.commons, options.devkit.commands[key].options)
    // 设置当前当前执行的环境变量
    single.currentEnv = key
    Object.assign(options.devkit.commands[key].options, single)
  }
  return options
}

// 获取配置的config
function getConfig(options, env) {
  options = setSingleConfig(options)
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
export function run(ctx, options) {

    importConfig = getConfig(ctx.projectConfig, options.env);
    console.log(importConfig)
    config = merge(currentConfig, build.createDevConfig(importConfig));
    // console.log(config);

    webpack(config, (err, stats) => {
      if (err) {
          console.log(err);
      }
      console.log(
          stats.toString({
            chunks: false,
            colors: true,
            children: false
          })
      );
    });
}


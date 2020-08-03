"use strict";

var _index = _interopRequireDefault(require("./build/index.js"));

var _index2 = require("./tools/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var webpack = require("webpack");

var currentConfig = require("./webpack/webpack.dev.config");

var merge = require("webpack-merge");

var WebpackDevServer = require("webpack-dev-server");

var os = require("os");

var chalk = require("chalk"); // 获取本地ip地址


function getIPAdress() {
  var interfaces = os.networkInterfaces();

  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];

      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
}

var myHost = getIPAdress();
var config = {},
    importConfig = {};
var build = new _index["default"]();

function setSingleConfig(options) {
  for (var key in options.devkit.commands) {
    // 单独配置的选项会覆盖公共配置
    // let single = Object.assign(
    // 	options.devkit.commons,
    // 	options.devkit.commands[key].options
    // )
    var single = merge(options.devkit.commons, options.devkit.commands[key].options);
    single = (0, _index2.deepCloneUnique)(single, "optionsId"); // 设置当前当前执行的环境变量

    single.currentEnv = key;
    Object.assign(options.devkit.commands[key].options, single);
  }

  return options;
} // 获取配置的config


function getConfig(options, env) {
  // 将公共配置绑定到各个环境
  options = setSingleConfig(options); // console.log(options.devkit.commands)
  // console.log(options.devkit.commands['test'].options)

  return options.devkit.commands[env].options;
}

module.exports = function (ctx) {
  importConfig = getConfig(ctx.projectConfig, "dev");
  config = merge(currentConfig, build.createDevConfig(importConfig));
  var compiler = webpack(config);
  var devServerOptions = Object.assign({}, config.devServer, {
    open: true,
    stats: {
      colors: true
    }
  });
  var server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(devServerOptions.port, myHost, function () {
    console.log(chalk.cyan("ctrl+\u9F20\u6807\u5DE6\u952E\u70B9\u5F00\u8FD9\u4E2A\u94FE\u63A5\u6109\u5FEB\u7684\u73A9\u800D\u5427:http://".concat(myHost, ":").concat(devServerOptions.port)));
  });
};
"use strict";

var _index = _interopRequireDefault(require("./build/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var webpack = require("webpack");

var currentConfig = require("./webpack/webpack.dev.config");

var merge = require("webpack-merge");

var WebpackDevServer = require("webpack-dev-server");

var os = require('os'); // 获取本地ip地址


function getIPAdress() {
  var interfaces = os.networkInterfaces();

  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
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
    var single = Object.assign(options.devkit.commons, options.devkit.commands[key].options); // 设置当前当前执行的环境变量

    single.currentEnv = key;
    Object.assign(options.devkit.commands[key].options, single);
  }

  return options;
} // 获取配置的config


function getConfig(options, env) {
  // 将公共配置绑定到各个环境
  options = setSingleConfig(options); // console.log(options)
  // console.log(options.devkit.commands[env].options)

  return options.devkit.commands[env].options;
}

module.exports = function (ctx) {
  importConfig = getConfig(ctx.projectConfig, "dev");
  config = merge(currentConfig, build.createDevConfig(importConfig)); // console.log(config);

  var compiler = webpack(config);
  var devServerOptions = Object.assign({}, config.devServer, {
    open: true,
    stats: {
      colors: true
    }
  });
  var server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(devServerOptions.port, myHost, function () {
    console.log("Starting server on  http://".concat(myHost, ":").concat(devServerOptions.port));
  }); // webpack(config, (err, stats) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(
  //     stats.toString({
  //       chunks: false,
  //       colors: true,
  //       children: false
  //     })
  //   );
  // });
};
const webpack = require("webpack");
const currentConfig = require("./webpack/webpack.dev.config");
const merge = require("webpack-merge");
const WebpackDevServer = require("webpack-dev-server");
const os = require('os');

// 获取本地ip地址
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
const myHost = getIPAdress();

let config = {},
  importConfig = {};

import Builder from "./build/index.js";
let build = new Builder();

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
  // 将公共配置绑定到各个环境
  options = setSingleConfig(options)
  // console.log(options)
  // console.log(options.devkit.commands[env].options)
  return options.devkit.commands[env].options;
}

module.exports = ctx => {

  importConfig = getConfig(ctx.projectConfig, "dev");
  config = merge(currentConfig, build.createDevConfig(importConfig));
  // console.log(config);

  const compiler = webpack(config);
  const devServerOptions = Object.assign({}, config.devServer, {
    open: true,
    stats: {
      colors: true
    }
  });

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(devServerOptions.port, myHost, () => {
    console.log(`Starting server on  http://${myHost}:${devServerOptions.port}`);
  });

  // webpack(config, (err, stats) => {
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

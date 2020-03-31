"use strict";

var _build = require("./build.js");

module.exports = function (ctx) {
  var runParams = {
    env: 'build'
  };
  (0, _build.run)(ctx, runParams);
};
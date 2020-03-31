"use strict";

var _build = require("./build.js");

module.exports = function (ctx) {
  var runParams = {
    env: "demo"
  };
  (0, _build.run)(ctx, runParams);
};
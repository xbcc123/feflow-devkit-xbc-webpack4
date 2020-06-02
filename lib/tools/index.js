"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCopy = deepCopy;
exports.removeRepeat = removeRepeat;
exports.singleKey = singleKey;
exports.deepCloneUnique = deepCloneUnique;
exports.listDir = listDir;
exports.merge = merge;
exports.getCSSModulesLocalIdent = getCSSModulesLocalIdent;
exports.postMessage = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 深拷贝
function deepCopy(source) {
  var ret = {};

  for (var k in source) {
    ret[k] = _typeof(source[k]) === "object" ? deepCopy(source[k]) : source[k];
  }

  return ret;
} // 对象数组去重 根据key


function removeRepeat(arr, key) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i][key] === arr[j][key]) {
        arr.splice(j, 1);
        j = j - 1; // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
      }
    }
  }

  return arr;
} // 合并key相同的数据 单个options配置的数据优先


function singleKey(arr, key) {
  var arr1 = [],
      obj = {};

  var _iterator = _createForOfIteratorHelper(arr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      if (!item[key]) {
        item[key] = "nokey";
      }

      obj[item[key]] = item;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (var _key in obj) {
    if (obj.hasOwnProperty(_key)) {
      arr1.push(obj[_key]);
    }
  }

  return arr1;
} //  遍历每一个属性


function deepCloneUnique(obj, currentKey) {
  var result = typeof obj.splice === "function" ? [] : {};

  if (obj && _typeof(obj) === "object") {
    // 如果是数组则执行根据key去重
    if (Array.isArray(obj)) {
      obj = singleKey(obj, currentKey);
    }

    for (var key in obj) {
      if (obj[key] && _typeof(obj[key]) === "object") {
        result[key] = deepCloneUnique(obj[key], currentKey); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
      } else {
        result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
      }
    }

    return result;
  }

  return obj;
}
/**
 * 列出某个目录下的子目录, DFS算法
 * @param root         目录路径
 * @param level        列出的子目录层级
 * @param directories  默认为[]
 * @returns {*|Array}
 */


function listDir(root, level, directories) {
  directories = directories || [];

  if (!fs_1["default"].existsSync(root)) {
    return directories;
  }

  if (fs_1["default"].statSync(root).isDirectory() && level > 0) {
    fs_1["default"].readdirSync(root).forEach(function (name) {
      var dirPath = path_1["default"].join(root, name);

      if (fs_1["default"].statSync(dirPath).isDirectory()) {
        directories.push({
          name: name,
          dirPath: dirPath
        });
        listDir(dirPath, level - 1, directories);
      }
    });
  }

  return directories;
}
/**
 * Merge 2个对象
 * @param obj1   Object
 * @param obj2   Object
 */


function merge(obj1, obj2) {
  // return Object.assign({}, obj1, obj2);
  return Object.assign({}, obj1, obj2);
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

exports.isEmpty = function (obj) {
  if (obj == null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (_typeof(obj) !== "object") return true;

  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
};
/**
 * 用于css-loader转换类名：
 * 1.去除样式文件名的'.module'前缀；
 * 2.遇到以'index.module.xxx'命名的样式文件使用文件夹名代替文件名来组成转换后的类名。
 * 此方法基于'react-dev-utils/getCSSModuleLocalIdent'，增加less正则匹配（https://www.npmjs.com/package/react-dev-utils）
 * @param context webpack传给css-loader的context对象
 * @param localIdentName css-loader的options.localIdentName，没传默认是'[hash:base64]'，这里用不到
 * @param localName 原始css类名
 * @param options css-loader中三个配置项的组合，长这样：
   {
      regExp: options.localIdentRegExp,
      hashPrefix: options.hashPrefix || '',
      context: options.context,
   }
 */


function getCSSModulesLocalIdent(context, localIdentName, localName, options) {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  var fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|scss|sass|less)$/ // 此处增加less，其余和原函数一致
  ) ? "[folder]" : "[name]"; // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.

  var hash = _loaderUtils["default"].getHashDigest(path_1["default"].posix.relative(context.rootContext, context.resourcePath) + localName, "md5", "base64", 5); // Use loaderUtils to find the file or folder name


  var className = _loaderUtils["default"].interpolateName(context, fileNameOrFolder + "_" + localName + "__" + hash, options); // remove the .module that appears in every classname when based on the file.


  return className.replace(".module_", "_");
}
/**
 * 增加builder作为子进程时的通信能力
 * 目前有四条指令，分别对应build和dev时构建成功和失败的场景
 *
 */


var postMessage = {
  send: function send(channel, data) {
    process && process.send && process.send(JSON.stringify({
      type: channel,
      data: data
    }));
  },
  error: function error(type, msg) {
    this.send("feflow:builder:" + type + ":error", msg);
  },
  success: function success(type, msg) {
    this.send("feflow:builder:" + type + ":success", msg);
  }
};
exports.postMessage = postMessage;
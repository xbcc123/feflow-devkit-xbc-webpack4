import fs from "fs"
import path from "path"
import loaderUtils from "loader-utils"

// 深拷贝
export function deepCopy(source) {
	var ret = {}
	for (var k in source) {
		ret[k] = typeof source[k] === "object" ? deepCopy(source[k]) : source[k]
	}
	return ret
}

// 对象数组去重 根据key
export function removeRepeat(arr, key) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i][key] === arr[j][key]) {
				arr.splice(j, 1)
				j = j - 1 // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
			}
		}
	}
	return arr
}

// 合并key相同的数据 单个options配置的数据优先
export function singleKey(arr, key) {
	let resultArr = [],
		obj = {}
	arr.forEach((item, index) => {
		if (!item[key]) {
			item[key] = index + "a" + parseInt(Math.random() * 100000000) // 防止元素顺序改变
		}
		obj[item[key]] = item
	})
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			resultArr.push(obj[key])
		}
	}
	return resultArr
}

//  深拷贝 执行数组去重
export function deepCloneUnique(obj, currentKey) {
	let result = typeof obj.splice === "function" ? [] : {}
	if (obj && typeof obj === "object") {
		// 如果是数组则执行根据key去重
		if (Array.isArray(obj)) {
			obj = singleKey(obj, currentKey)
		}
		for (let key in obj) {
			if (obj[key] && typeof obj[key] === "object") {
				result[key] = deepCloneUnique(obj[key], currentKey) //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
			} else {
				result[key] = obj[key] //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
			}
		}
		return result
	}
	return obj
}

/**
 * 列出某个目录下的子目录, DFS算法
 * @param root         目录路径
 * @param level        列出的子目录层级
 * @param directories  默认为[]
 * @returns {*|Array}
 */
export function listDir(root, level, directories) {
	directories = directories || []
	if (!fs_1.default.existsSync(root)) {
		return directories
	}
	if (fs_1.default.statSync(root).isDirectory() && level > 0) {
		fs_1.default.readdirSync(root).forEach(function(name) {
			var dirPath = path_1.default.join(root, name)
			if (fs_1.default.statSync(dirPath).isDirectory()) {
				directories.push({
					name: name,
					dirPath: dirPath
				})
				listDir(dirPath, level - 1, directories)
			}
		})
	}
	return directories
}

/**
 * Merge 2个对象
 * @param obj1   Object
 * @param obj2   Object
 */
export function merge(obj1, obj2) {
	// return Object.assign({}, obj1, obj2);
	return Object.assign({}, obj1, obj2)
}

var hasOwnProperty = Object.prototype.hasOwnProperty

exports.isEmpty = function(obj) {
	if (obj == null) return true
	if (obj.length > 0) return false
	if (obj.length === 0) return true
	if (typeof obj !== "object") return true
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false
	}
	return true
}

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

export function getCSSModulesLocalIdent(
	context,
	localIdentName,
	localName,
	options
) {
	// Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
	var fileNameOrFolder = context.resourcePath.match(
		/index\.module\.(css|scss|sass|less)$/ // 此处增加less，其余和原函数一致
	)
		? "[folder]"
		: "[name]"
	// Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
	var hash = loaderUtils.getHashDigest(
		path_1.default.posix.relative(
			context.rootContext,
			context.resourcePath
		) + localName,
		"md5",
		"base64",
		5
	)
	// Use loaderUtils to find the file or folder name
	var className = loaderUtils.interpolateName(
		context,
		fileNameOrFolder + "_" + localName + "__" + hash,
		options
	)
	// remove the .module that appears in every classname when based on the file.
	return className.replace(".module_", "_")
}

/**
 * 增加builder作为子进程时的通信能力
 * 目前有四条指令，分别对应build和dev时构建成功和失败的场景
 *
 */
export const postMessage = {
	send: function(channel, data) {
		process &&
			process.send &&
			process.send(JSON.stringify({ type: channel, data: data }))
	},
	error: function(type, msg) {
		this.send("feflow:builder:" + type + ":error", msg)
	},
	success: function(type, msg) {
		this.send("feflow:builder:" + type + ":success", msg)
	}
}

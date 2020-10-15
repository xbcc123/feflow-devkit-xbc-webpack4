const path = require("path")
const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
	// 你想要打包的模块的数组
	entry: {
		vendor: ["axios", "core-js"]
	},
	output: {
		path: path.join(__dirname, "./"), // 打包后文件输出的位置
		filename: "[name].dll.js",
		library: "[name]_library"
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true
			})
		]
	},
	plugins: [
		new webpack.DllPlugin({
			context: __dirname,
			name: "[name]_library",
			path: path.join(__dirname, "[name]-manifest.json")
		})
	]
}

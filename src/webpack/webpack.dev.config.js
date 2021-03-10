const merge = require("webpack-merge")
const webpack = require("webpack")
const path = require("path")
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const baseConfig = require("./webpack.base.config")

const projectRoot = process.cwd()

const devConfig = {
	mode: "development",
	module: {
		rules: [
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new FriendlyErrorsWebpackPlugin()
	],
	devServer: {
		contentBase: [path.join(projectRoot, "./dist")],
		hot: true,
		host: "0.0.0.0",
		useLocalIp: true,
		clientLogLevel: "warning",
		stats: "errors-only",
		noInfo: true,
		open: true,
		overlay: false,
		watchOptions: {
			ignored: /node_modules/,
			aggregateTimeout: 100,
			poll: 1000
		}
	},
	devtool: "cheap-module-eval-source-map"
}

module.exports = merge(baseConfig, devConfig)

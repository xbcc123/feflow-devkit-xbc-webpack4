import path from "path"
import glob from "glob"
import webpack from "webpack"
import fs from "fs"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackExternalsPlugin from "html-webpack-externals-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin

import {
	deepCopy
} from "../tools/index.js"

const webpackMerge = require("webpack-merge")

function getPath(filename) {
	let currDir = process.cwd()
	while (!fs.existsSync(path.join(currDir, filename))) {
		currDir = path.join(currDir, "../")

		// unix跟目录为/， win32系统根目录为 C:\\格式的
		if (currDir === "/" || /^[a-zA-Z]:\\$/.test(currDir)) {
			return ""
		}
	}
	return currDir
}

// 当前运行的时候的根目录
let projectRoot = getPath(".feflowrc.json")

if (!projectRoot) {
	projectRoot = getPath(".feflowrc.js")
}

const baseConfig = {
	module: {},
	resolve: {}
}

class Builder {
	// 创建dev配置
	createDevConfig(options) {
		const devConfig = deepCopy(baseConfig)
		devConfig.mode = "development"
		// 设置打包规则
		const devRules = []

		// 设置CSS解析规则  isMinicss是否开启css抽离  isModule是否开启css Modules
		devRules.push(this.setCssRule(options.isModule, options.isMinicss))
		// 设置less
		devRules.push(this.setLessRule(options.isModule, options.isMinicss))
		// 设置scss
		devRules.push(this.setSassRule(options.isModule, options.isMinicss))
		// 设置stylus
		devRules.push(this.setStylusRule(options.isModule, options.isMinicss))

		// 设置打包插件
		let devPlugins = []
		// devPlugins.push(new StringReplaceWebpackPlugin());

		// 设置提取CSS为一个单独的文件的插件
		if (options.isMinicss) {
			devPlugins.push(this.setMiniCssExtractPlugin())
			devPlugins.push(this.setOptimizeCssAssetsPlugin())
		}

		devConfig.module.rules = devRules
		devConfig.plugins = devPlugins

		// 设置启动服务端口号 本地服务配置
		devConfig.devServer = this.setDevServer(options.port || 1234)
		return webpackMerge(this.mixCreateConfig(options), devConfig)
	}

	// 创建prod配置
	createProdConfig(options) {
		const prodConfig = deepCopy(baseConfig)
		// 设置打包规则
		const prodRules = []
		// 设置CSS解析规则  isMinicss是否开启css抽离  isModule是否开启css Modules
		prodRules.push(this.setCssRule(options.isModule, options.isMinicss))
		// 设置less
		prodRules.push(this.setLessRule(options.isModule, options.isMinicss))
		// 设置scss
		prodRules.push(this.setSassRule(options.isModule, options.isMinicss))
		// 设置stylus
		prodRules.push(this.setStylusRule(options.isModule, options.isMinicss))
		// 设置打包插件
		let prodPlugins = []
		// 设置提取CSS为一个单独的文件的插件
		if (options.isMinicss) {
			prodPlugins.push(this.setMiniCssExtractPlugin())
			prodPlugins.push(this.setOptimizeCssAssetsPlugin())
		}

		prodConfig.module.rules = prodRules
		prodConfig.plugins = prodPlugins

		return webpackMerge(this.mixCreateConfig(options), prodConfig)
	}

	// 公用配置
	mixCreateConfig(options) {
		const mixConfig = deepCopy(baseConfig)

		// 设置打包规则
		let minRules = []

		// 设置打包插件
		let mixPlugins = []

		// 环境变量配置
		mixPlugins.push(this.setDefinePlugin(options.envs, options.currentEnv))

		// externals配置
		if (options.externals && options.externals.length > 0) {
			mixPlugins.push(this.setExternalPlugin(options.externals))
		}

		// 是否启动打包性能分析
		if (options.hasAnalyzer) {
			mixPlugins.push(this.setBundleSnalyzerPlugin(options.analyzer))
		}

		mixConfig.entry = this.setEntry(options.entry)
		mixConfig.resolve.alias = this.setAlias(options.alias)
		// mixConfig.resolve.extensions = []

		mixConfig.module.rules = minRules
		mixConfig.plugins = mixPlugins
		return mixConfig
	}

	/**
	 * externals 配置
	 * @private
	 */
	setExternalPlugin(externals) {
		const newExternals = externals
		//   console.log(newExternals)
		return new HtmlWebpackExternalsPlugin({ externals: newExternals })
	}

	// 设置打包优化
	setBundleSnalyzerPlugin(analyzer) {
		// console.log(analyzer)
		if (!analyzer || JSON.stringify(analyzer) === "{}") {
			analyzer = {
				analyzerPort: "4321"
			}
		}
		return new BundleAnalyzerPlugin(analyzer)
	}

	// 设置别名
	setAlias(alias) {
		let aliasObj = {}
		if (Object.prototype.toString.call(alias) !== "[object Object]") {
			return aliasObj
		}
		for (let key in alias) {
			aliasObj[key] = path.join(projectRoot, `${alias[key]}`)
		}
		return aliasObj
	}

	// 设置入口
	setEntry(entry) {
		return path.join(projectRoot, `./src/${entry}`)
	}

	// isMinicss 是否开启css抽离  isModule 是否开启css Modules
	setCssRule(isModule, isMinicss) {
		return {
			test: /\.css$/,
			use: [
				isMinicss ? MiniCssExtractPlugin.loader : "style-loader",
				{
					loader: "css-loader",
					options: {
						modules: isModule
							? {
									mode: "local",
									exportGlobals: true,
									localIdentName:
										"[path][name]__[local]--[hash:base64:5]"
							  }
							: false
					}
				},
				"postcss-loader"
			]
		}
	}

	setLessRule(isModule, isMinicss) {
		return {
			test: /\.less$/,
			use: [
				isMinicss ? MiniCssExtractPlugin.loader : "style-loader",
				{
					loader: "css-loader",
					options: {
						modules: isModule
							? {
									mode: "local",
									exportGlobals: true,
									localIdentName:
										"[path][name]__[local]--[hash:base64:5]"
							  }
							: false
					}
				},
				"postcss-loader",
				{
					loader: "less-loader",
					options: {
						lessOptions: {
							javascriptEnabled: true
						}
					}
				}
			]
		}
	}

	setSassRule(isModule, isMinicss) {
		return {
			test: /\.scss$/,
			use: [
				isMinicss ? MiniCssExtractPlugin.loader : "style-loader",
				{
					loader: "css-loader",
					options: {
						modules: isModule
							? {
									mode: "local",
									exportGlobals: true,
									localIdentName:
										"[path][name]__[local]--[hash:base64:5]"
							  }
							: false
					}
				},
				"postcss-loader",
				"sass-loader"
			]
		}
	}

	setStylusRule(isModule, isMinicss) {
		return {
			test: /\.sty(l|lus)$/,
			use: [
				isMinicss ? MiniCssExtractPlugin.loader : "style-loader",
				{
					loader: "css-loader",
					options: {
						modules: isModule
							? {
									mode: "local",
									exportGlobals: true,
									localIdentName:
										"[path][name]__[local]--[hash:base64:5]"
							  }
							: false
					}
				},
				"postcss-loader",
				"stylus-loader"
			]
		}
	}

	setMiniCssExtractPlugin() {
		return new MiniCssExtractPlugin({
			filename: "static/css/[name].[contenthash].css"
		})
	}

	setOptimizeCssAssetsPlugin() {
		return new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require("cssnano")
		})
	}

	setDevServer(port) {
		return {
			port: port
		}
	}

	setDefinePlugin(envs, currentEnv) {
		// console.log(envs[currentEnv].envObj);
		return new webpack.DefinePlugin({
			"process.env": envs[currentEnv].envObj
		})
	}
}

export default Builder

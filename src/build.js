const webpack = require("webpack")
const ora = require("ora")
const chalk = require("chalk")
const currentConfig = require("./webpack/webpack.prod.config")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin()

const merge = require("webpack-merge")
let config = {},
	importConfig = {}

import Builder from "./build/index.js"
import { deepCloneUnique } from "./tools/index.js"
let build = new Builder()

// 将公共配置绑定到各个环境
function setSingleConfig(options) {
	for (let key in options.devkit.commands) {
		// 单独配置的选项会覆盖公共配置
		// let single = Object.assign(options.devkit.commons, options.devkit.commands[key].options)
		let single = merge(
			options.devkit.commons,
			options.devkit.commands[key].options
		)
		single = deepCloneUnique(single, "optionsId")
		// 设置当前当前执行的环境变量
		single.currentEnv = key
		Object.assign(options.devkit.commands[key].options, single)
	}
	return options
}

// 获取配置的config
function getConfig(options, env) {
	options = setSingleConfig(options)
	return options.devkit.commands[env].options
}

/**
 * @function run
 * @desc     创建用于开发过程中的webpack打包配置
 *
 * @param {Object}  options                         参数
 *
 * @example
 */
export function run(ctx, options) {
	importConfig = getConfig(ctx.projectConfig, options.env)
	config = merge(currentConfig, build.createProdConfig(importConfig))
	config = smp.wrap(config)
	const spinner = ora(chalk.yellow("项目正在打包 请稍候..."))
	spinner.start()
	webpack(config, (err, stats) => {
		spinner.stop()
		if (err) throw err
		process.stdout.write(
			stats.toString({
				publicPath: true,
				entrypoints: true,
				colors: true,
				assets: false, // 隐藏打包资源名称
				modules: false,
				children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
				chunks: false,
				chunkModules: false,
				builtAt: true, // 添加构建日期和构建时间信息
				cached: true // 添加缓存（但未构建）模块的信息
				// cachedAssets: true,  // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
			}) + "\n\n"
		)

		if (stats.hasErrors()) {
			console.log(chalk.red("  Build failed with errors.\n"))
			process.exit(1)
		}
		console.log(chalk.cyan("  Build complete.\n"))
	})
}

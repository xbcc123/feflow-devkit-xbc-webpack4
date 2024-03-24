const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")
const baseConfig = require("./webpack.base.config")
const projectRoot = process.cwd()
const HtmlWebpackPlugin = require("html-webpack-plugin")

const prodConfig = {
	mode: "production",
	devtool: false,
	module: {
		rules: [
		]
	},
	plugins: [
		new webpack.ids.HashedModuleIdsPlugin({
			hashFunction: "sha256",
			hashDigest: "hex",
			hashDigestLength: 20
		}),
		// 压缩html
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.join(projectRoot, "index.html"),
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false
			}
		})
	],
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 80 * 1024,
			maxSize: 200 * 1024,
			minChunks: 1,
			maxAsyncRequests: 6,
			maxInitialRequests: 4,
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true, // 开启多进程
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {
						drop_console: true,
						pure_funcs: ["console.log"] // 统一删除console.log
					},
					mangle: true,
					module: false,
					output: {
						comments: false
					},
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_classnames: undefined,
					keep_fnames: false,
					safari10: false
				}
			})
		]
	}
}

module.exports = merge(baseConfig, prodConfig)

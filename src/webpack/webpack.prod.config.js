const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")
const baseConfig = require("./webpack.base.config")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const projectRoot = process.cwd()

const prodConfig = {
	mode: "production",

	devtool: false,
	module: {
		rules: [
		]
	},
	plugins: [
		new webpack.HashedModuleIdsPlugin({
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
			automaticNameDelimiter: "~",
			automaticNameMaxLength: 30
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: false, // 开启多进程
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {
						drop_console: true,
						pure_funcs: ["console.log"] // 统一删除console.log
					},
					mangle: true, // Note `mangle.properties` is `false` by default.
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

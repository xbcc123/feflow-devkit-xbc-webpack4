const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")
const baseConfig = require("./webpack.base.config")
const CompressionPlugin = require("compression-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const projectRoot = process.cwd()

const prodConfig = {
	mode: "production",

	devtool: false,
	module: {
		rules: [
			// {
			//   test: /\.css$/,
			//   use: [
			//     MiniCssExtractPlugin.loader,
			//     {
			//       loader: "css-loader",
			//       options: {
			//         // modules: true,
			//         localIdentName: "[name]__[local]--[hash:base64:5]"
			//       }
			//     }
			//   ]
			// },
			// {
			//   test: /\.less$/,
			//   use: [
			//     MiniCssExtractPlugin.loader,
			//     {
			//       loader: "css-loader",
			//       options: {
			//         // modules: true,
			//         localIdentName: "[name]__[local]--[hash:base64:5]"
			//       }
			//     },
			//     "less-loader"
			//   ]
			// },
			// {
			//   test: /\.scss$/,
			//   use: [
			//     MiniCssExtractPlugin.loader,
			//     {
			//       loader: "css-loader",
			//       options: {
			//         // modules: true,
			//         localIdentName: "[name]__[local]--[hash:base64:5]"
			//       }
			//     },
			//     "sass-loader"
			//   ]
			// },
			// {
			//   test: /\.sty(l|lus)$/,
			//   use: [
			//     MiniCssExtractPlugin.loader,
			//     {
			//       loader: "css-loader",
			//       options: {
			//         modules: true,
			//         localIdentName: "[name]__[local]--[hash:base64:5]"
			//       }
			//     },
			//     "stylus-loader"
			//   ]
			// }
		]
	},
	plugins: [
		// new MiniCssExtractPlugin({
		//   filename: "static/css/[name].[contenthash].css"
		// }),

		// new CompressionPlugin({
		//   asset: "[path].gz[query]",
		//   algorithm: "gzip",
		//   test: /\.(js|html)$/,
		//   threshold: 10240,
		//   minRatio: 0
		// }),

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
			minSize: 0,
			maxSize: 200 * 1024,
			minChunks: 1,
			maxAsyncRequests: 6,
			maxInitialRequests: 4,
			automaticNameDelimiter: "~",
			automaticNameMaxLength: 30,
			cacheGroups: {
				vendor: {
					// node_modules内的依赖库
					// chunks: "initial", // initial all async
					// test: /[\\/]node_modules[\\/]/,
					// name: "vendor",
					// minChunks: 2, //被不同entry引用次数(import),1次的话没必要提取
					// maxInitialRequests: 5, // 入口点最大请求数量
					// // maxAsyncRequests: 3, // 按需加载时并行请求的最大数量
					// minSize: 0,
					// maxSize: 400 * 1024,
					// priority: 100,
					// reuseExistingChunk: true
				},
				router: {
					chunks: "all",
					test: /[\\/]router[\\/]/,
					name: "public", //生成文件名，依据output规则
					minChunks: 1,
					maxInitialRequests: 5,
					minSize: 0,
					maxSize: 80 * 1024,
					priority: 1,
					reuseExistingChunk: true
				}
			}
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				// compress: true,
				// mangle: true,
				cache: true,
				parallel: false, // 开启多进程
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {
						drop_console: true,
						pure_funcs: ["console.log"] // 统一删除console.log
						// pure_funcs: 'console.info'
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

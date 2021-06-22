const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const colors = require("colors");


const projectRoot = process.cwd()

const entry = path.join(projectRoot, "./src/index.js")

module.exports = {
	context: path.join(projectRoot, "./"),
	entry: entry,
	output: {
		path: path.join(projectRoot, "dist"),
		filename: "static/js/[name].[hash].bundle.js",
		chunkFilename: "static/js/[name].[chunkhash].bundle.js",
		pathinfo: false,
		publicPath: "/"
	},

	externals: {
		react: "React",
		"react-dom": "ReactDOM",
		antd: "antd",
		"element-ui": "ELEMENT",
		vue: "Vue",
		vuex: "Vuex",
		"vue-router": "VueRouter",
		jquery: "$",
		moment: "moment",
		"mint-ui": "MINT",
		"crypto-js": "CryptoJS",
		lodash: "_"
	},
	resolveLoader: {
		// modules: ["node_modules"]
		modules: [
			path.resolve(__dirname, "../../node_modules"),
			path.join(projectRoot, "node_modules")
		]
	},

	resolve: {
		extensions: [".ts", ".js", "jsx", ".tsx", ".json", ".vue"],
		alias: {
			vue$: "vue/dist/vue.esm.js",
			app: path.join(projectRoot, "./src/app.js"),
			"@": path.join(projectRoot, "./src")
		},
		mainFiles: ["index"],
		// modules: ["node_modules"],
		modules: [
			path.resolve(__dirname, "../../node_modules"),
			path.join(projectRoot, "node_modules")
		]
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: "thread-loader"
					},
					{
						loader: "cache-loader"
					},
					{
						loader: "vue-loader"
					}
				]
			},
			{
				test: /\.js$/,
				exclude: [
					path.join(projectRoot, "node_modules"),
					path.resolve(__dirname, "../../node_modules")
				],
				use: [
					{
						loader: "thread-loader"
					},
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
							compact: false
						}
					}
				]
			},
			{
				test: /\.(j|t)sx?$/,
				use: [
					{
						loader: "thread-loader"
					},
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
							compact: false
						}
					}
				],
				exclude: [
					path.join(projectRoot, "node_modules"),
					path.resolve(__dirname, "../../node_modules")
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							esModule: false, // 这里设置为false
							name: "static/img/[name].[hash:7].[ext]"
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							esModule: false, // 这里设置为false
							name: "static/fonts/[name].[hash:7].[ext]"
						}
					}
				]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							esModule: false, // 这里设置为false
							name: "static/media/[name].[hash:7].[ext]"
						}
					}
				]
			}
		]
	},

	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.join(projectRoot, "index.html")
		}),
		new CopyWebpackPlugin([
			{
				from: path.join(projectRoot, "./static"),
				to: "static",
				ignore: [".*"]
			}
		]),
		new ProgressBarPlugin({
			format:
				"run [:bar] " + colors.green.bold(":percent") + " (:elapsed seconds)",
			clear: true
		}),
	]
}

/* eslint-disable no-undef */
import Builder from "../../lib/build/index.js"
const build = new Builder()
const config = {
	entry: "index.tsx",
	isModule: true,
	isMinicss: false,
	hasAnalyzer: false,
	analyzer: {
		analyzerPort: 3478
	},
	port: 1234,
	externals: [
		{
			module: "react",
			entry: "../../static/js/react16.13.1.js",
			global: "React"
		},
		{
			module: "react-dom",
			entry: "../../static/js/react-dom16.13.1.js",
			global: "ReactDOM"
		},
		{
			module: "antd",
			entry: "https://cdn.bootcss.com/antd/3.26.12/antd.min.js",
			global: "antd"
		}
	],
	currentEnv: "dev",
	envs: {
		dev: {
			envObj: {
				NODE_ENV: "'development'",
				API_HOST: "'http://xxx.xxx.xx.xxx:xxx'"
			}
		},
		test: {
			envObj: {
				NODE_ENV: "'test'",
				API_HOST: "'http://xxx.xxx.xx.xxx:xxx'"
			}
		},
		formalTest: {
			envObj: {
				NODE_ENV: "'formalTest'",
				API_HOST: "'http://xxx.xxx.xx.xxx:xxx'"
			}
		},
		demo: {
			envObj: {
				NODE_ENV: "'demo'",
				API_HOST: "'http://xxx.xxx.xx.xxx:xxx'"
			}
		},
		build: {
			envObj: {
				NODE_ENV: "'production'",
				API_HOST: "'http://xxx.xxx.xx.xxx:xxx'"
			}
		}
	}
}

// console.log(build)

describe("打包文件是否能够正确的返回值", () => {
	test("dev配置有返回值", () => {
		expect(build.createDevConfig(config).mode).toBe("development")
	})
	test("prod配置有返回值", () => {
		expect(build.createProdConfig(config).plugins).toEqual(
			expect.arrayContaining([])
		)
	})
})

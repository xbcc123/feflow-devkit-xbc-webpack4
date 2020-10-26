module.exports = {
    devkit: {
        commands: {
            dev: {
                builder: "feflow-devkit-xbc-webpack4:dev",
                options: {
                    isMinicss: false,
					port: 1123
                },
            },
            test: {
                builder: "feflow-devkit-xbc-webpack4:test",
                options: {
					isMinicss: true,
                }
            },
            formalTest: {
                builder: "feflow-devkit-xbc-webpack4:formalTest",
                options: {
					isMinicss: true,
                }
            },
            demo: {
                builder: "feflow-devkit-xbc-webpack4:demo",
                options: {
					isMinicss: true,
                }
            },
            build: {
                builder: "feflow-devkit-xbc-webpack4:build",
                options: {
					isMinicss: true,
					externals: [
						{
							optionsId: 100,
							module: "vue",
							entry: "../../static/js/vue2.5.2.min.js",
							global: "Vue"
						},
					],
                }
            }
        },
        commons: {
            entry: "index.tsx",
            isModule: false,
            isMinicss: true,
            hasAnalyzer: false,
            analyzer: {
                "analyzerPort": 3479
            },
			port: 1234,
			alias: {
				"@": "src",
			},
            externals: [
				{
					optionsId: 100,
                    module: "vue",
                    entry: "../../static/js/vue2.5.2.js",
                    global: "Vue"
				},
				{
                    module: "element-ui",
                    entry: "../../static/js/element-ui2.13.2.min.js",
                    global: "ELEMENT"
                },
			],
            envs: {
                dev: {
                    envObj: {
                        NODE_ENV: "'development'",
                        API_HOST: "'http://192.168.16.9:8081'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://192.168.16.9:8081'",
						API_IMG: "'http://192.168.16.103:9999/'"
                    }
                },
                test: {
                    envObj: {
                        NODE_ENV: "'test'",
						API_HOST: "'http://192.168.16.9:8081'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://192.168.16.9:8081'",
						API_IMG: "'http://192.168.16.103:9999/'"
                    }
                },
                formalTest: {
                    envObj: {
                        NODE_ENV: "'formalTest'",
						API_HOST: "'http://192.168.16.9:8081'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://192.168.16.9:8081'",
						API_IMG: "'http://192.168.16.103:9999/'"
                    }
                },
                demo: {
                    envObj: {
                        NODE_ENV: "'demo'",
						API_HOST: "'http://192.168.16.9:8081'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://192.168.16.9:8081'",
						API_IMG: "'http://192.168.16.103:9999/'"
                    }
                },
                build: {
                    envObj: {
                        NODE_ENV: "'production'",
						API_HOST: "'http://192.168.16.9:8081'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://192.168.16.9:8081'",
						API_IMG: "'http://192.168.16.103:9999/'"
                    }
                }
            }
        }
    }
}

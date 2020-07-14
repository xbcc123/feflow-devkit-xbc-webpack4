module.exports = {
    devkit: {
        commands: {
            dev: {
                builder: "feflow-devkit-xbc-webpack4:dev",
                options: {
                    isMinicss: false,
                    port: 9878
                }
            },
            test: {
                builder: "feflow-devkit-xbc-webpack4:test",
                options: {
                    isMinicss: true
                }
            },
            formalTest: {
                builder: "feflow-devkit-xbc-webpack4:formalTest",
                options: {
                    isMinicss: true
                }
            },
            demo: {
                builder: "feflow-devkit-xbc-webpack4:demo",
                options: {
                    isMinicss: true
                }
            },
            build: {
                builder: "feflow-devkit-xbc-webpack4:build",
                options: {
                    "isMinicss": true
                }
            }
        },
        commons: {
            entry: "index.tsx",
            isModule: true,
            isMinicss: false,
            hasAnalyzer: false,
            analyzer: {
                "analyzerPort": 3478
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
                },
            ],
            envs: {
                dev: {
                    envObj: {
                        NODE_ENV: "'development'",
                        API_HOST: "'http://192.168.16.103:8080'",
                        imageUrl: "'http://192.168.16.103:9999'"
                    }
                },
                test: {
                    envObj: {
                        NODE_ENV: "'test'",
                        API_HOST: "'http://192.168.16.103:8080'",
                        imageUrl: "'http://192.168.16.103:8080'"
                    }
                },
                formalTest: {
                    envObj: {
                        NODE_ENV: "'formalTest'",
                        API_HOST: "'http://192.168.16.103:8080'",
                        imageUrl: "'http://192.168.16.103:8080'"
                    }
                },
                demo: {
                    envObj: {
                        NODE_ENV: "'demo'",
                        API_HOST: "'http://192.168.16.103:8080'",
                        imageUrl: "'http://192.168.16.103:8080'"
                    }
                },
                build: {
                    envObj: {
                        NODE_ENV: "'production'",
                        API_HOST: "'https://zchd.ezdiamond.cn/'",
                        imageUrl: "'http://192.168.16.103:9999/'"
                    }
                }
            }
        }
    }
}

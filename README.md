## 介绍

feflow-devkit-webpack4 为feflow套件 支持编译指定React，Vue项目模板 通过配置套件配置可以定制化项目编译参数


## 开始使用

```
cnpm install @feflow/cli -g
```
1. 在项目根目录新建.feflowrc.json文件
```
# feflowrc.json

{
  "devkit": {
    "commands": {
      "dev": {
        "builder": "feflow-devkit-xbc-webpack4-react:dev",
        "options": {
          "port": 1234,
          "currentEnv": "dev",
          "externals": [
            {
              "module": "react",
              "entry": "https://11.url.cn/now/lib/16.2.0/react.min.js?_bid=3123",
              "global": "React"
            },
            {
              "module": "react-dom",
              "entry": "https://11.url.cn/now/lib/16.2.0/react-dom.min.js?_bid=3123",
              "global": "ReactDOM"
            }
          ],
          "envs": {
            "dev": {
              "envObj": {
                "NODE_ENV": "\"development\"",
                "API_HOST": "\"http://192.168.16.9:8081\"",
                "SJY_URL": "\"http://192.168.16.9:9000\"",
                "HEHE_URL": "\"http://192.168.16.9:9001\"",
                "API_HOST_H5": "\"http://192.168.16.9:8081\"",
                "API_IMG": "\"http://192.168.16.103:9999/\""
              }
            },
            "prod": {
              "envObj": {
                "NODE_ENV": "",
                "API_HOST": ""
              }
            }
          }
        }
      },
      "build": {
        "builder": "feflow-devkit-xbc-webpack4-react:build",
        "options": {
            "port": 8003,
            "currentEnv": "prod",
            "externals": [
              {
                "module": "react",
                "entry": "https://11.url.cn/now/lib/16.2.0/react.min.js?_bid=3123",
                "global": "React"
              },
              {
                "module": "react-dom",
                "entry": "https://11.url.cn/now/lib/16.2.0/react-dom.min.js?_bid=3123",
                "global": "ReactDOM"
              }
            ],
            "envs": {
              "dev": {
                "envObj": {
                  "NODE_ENV": "\"development\"",
                  "API_HOST": "\"http://192.168.16.9:8081\"",
                  "SJY_URL": "\"http://192.168.16.9:9000\"",
                  "HEHE_URL": "\"http://192.168.16.9:9001\"",
                  "API_HOST_H5": "\"http://192.168.16.9:8081\"",
                  "API_IMG": "\"http://192.168.16.103:9999/\""
                }
              },
              "prod": {
                "envObj": {
                  "NODE_ENV": "",
                  "API_HOST": ""
                }
              }
            }
          }
      }
    }
  }
}


```


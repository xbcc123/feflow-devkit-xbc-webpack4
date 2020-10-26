## 测试模板

1. 在feflow根目录下执行`npm link`将套件绑定到全局npm
2. 切换到template目录下执行 `npm link feflow-devkit-xbc-webpack4`
3. 执行`cnpm i`下载其他依赖
4. 执行fef  test 测试项目目录下面是否存在dist，并且dist能正常启动
5. 执行fef  dev项目是否正常启动



#### tips

1. template目录下面可以是任意和套件搭配使用的模板 目前是`generator-xbc-vue`

2. 可以直接拷贝`generator-xbc-xxx`到template目录下然后删除 packge.json中的 `feflow-devkit-xbc-webpack4`

   


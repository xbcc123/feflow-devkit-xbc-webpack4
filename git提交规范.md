git-commit-style-guide

![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg?longCache=true&style=flat-square)


### 目的

* **统一团队 `Git commit` 日志标准，便于后续代码 review，版本发布以及日志自动化生成等等**。
* **统一团队的 Git 工作流，包括分支使用、tag 规范、issue 等**

### Git commit 日志参考案例

* [angular](https://github.com/angular/angular)
* [commit-message-test-project](https://github.com/cpselvis/commit-message-test-project)
* [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul)
* [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)

### 总体方案

![](/img/git-commit-message-mindmap.png)


### Git commit日志基本规范

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**所有的 type 类型如下：**

> type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。

* feat： 新增 feature
* fix: 修复 bug
* docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
* style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
* refactor: 代码重构，没有加新功能或者修复 bug
* perf: 优化相关，比如提升性能、体验
* test: 测试用例，包括单元测试、集成测试等
* chore: 改变构建流程、或者增加依赖库、工具等
* revert: 回滚到上一个版本

**格式要求：**

```
# 标题行：50个字符以内，描述主要变更内容
#
# 主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
#
# * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
# * 他如何解决这个问题? 具体描述解决问题的步骤
# * 是否存在副作用、风险? 
#
# 尾部：如果需要的化可以添加一个链接到issue地址或者其它文档，或者关闭某个issue。
```



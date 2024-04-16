# api_demo

> v2 是当前主要开发的分支

> 这是一个开源的、无服务器的API测试工具

> 系统要求

* Node.js版本需为14及以上

> 构建步骤

```bash
# 安装依赖
yarn

# 运行测试服务器，支持热更新
yarn run dev

# 构建当前平台的应用
yarn run build

# 运行单元测试和端到端测试
yarn test

# 对`src/`目录下的所有JS/Vue组件进行代码风格检查
yarn run lint

# 发布snap包
## 正式版
snapcraft upload --release=stable tsl-postman.snap
## 测试版
snapcraft upload --release=alpha tsl-postman.snap
```

> 特性：

- 开源、免费，支持定制修改

- 易于分享（建议使用版本控制工具如git、svn等进行分享）

- 无服务器依赖

- 结构化数据，数据格式简洁清晰

- 版本控制

- Mock数据生成

- 环境变量的设置和切换

- 自动化脚本测试/流水线测试（计划中）

- 标签功能，可为API设置不同的标签（开发中）

- 软连接功能，一个API可归属于多个分组（2.1.3版本及以上）

  

# 路线图

> V2.x 版本（2021年）

- 多语言支持
  - 进行中
- 支持导入和导出Postman格式
  - 已计划
- 插件功能实现
  - 已计划
- 完善分享功能
  - 进行中
- 文档项目离线化
  - 已规划

> V3.x 版本（2022年）

- 进行整体重构
  - 基于最新的`Electron`长期维护版本
  - `Vue`版本升级至3.x
  - 其他依赖包使用最新的长期维护版本

# 致谢

加速服务提供：[AWS](https://aws.amazon.com/)

项目构建基于 [electron-vue](https://github.com/SimulatedGREG/electron-vue).

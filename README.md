# 扩展

## 目录说明

- build 开发时扩展文件
- dist 发布后扩展打包文件
- public 静态资源
  - icons 图标
  - manifest 扩展 manifest 文件
  - devtools.html 开发工具入口页
  - options.html 选项页
  - popup.html 弹窗页
  - side-panel 侧边栏
  - panel.html 开发工具页
- src 扩展源码
  - components 公共的组件
  - options 选项页 app
  - popup 弹窗页 app
  - side-panel 侧边栏 app
  - panel 开发工具 app
  - background.ts 后台脚本
  - devtools.ts 开发工具脚本
  - inject.ts 注入脚本
  - options.ts 选项页入口
  - popup.ts 弹窗页入口
  - side-panel.ts 侧边栏入口
  - panel.ts 开发工具入口
- scrips 命令脚本
  - build.sh 打包命令

## 开发

### 安装依赖

```bash
npm install
```

### 运行

```bash
npm start
```

### 浏览器运行测试

1. url 输入 chrome://extensions/ 或者 edge://extensions/
2. 打开 Developer mode（开发人员模式）
3. 加载解压缩的扩展，选择 build 文件夹
4. 刷新页面

## 打包发布

### 打包文件

```bash
npm run build
```

beta 版本打包执行：

```bash
npm run build:beta
```

打包后的文件在 libs 中。

### 发布

登录对应的扩展开发者中心，注册并发布。

# vue_savage_admin



## 简介

一个中后台管理系统的基础框架，基于Vue3、Pinia、Typescript、Element-Plus 和 Vue-cli@4.x，在动态路由生成侧边栏菜单和路由注入等核心功能跟市面上的开源项目不一样，这里有自己特别的思考和处理方式。


## 安装与运行

```
git clone https://github.com/savage181855/vue-savage-admin.git

yarn install

yarn dev
```

## 项目结构

```
docs                  文档
src                   源码
  api                 api集中管理
  assets              静态资源
  components          全局组件
  constant            项目常量
  directives          全局指令
  layout              页面布局，单独抽离，灵活易用，降低耦合度
  pages               页面
  router              路由器和路有记录，这里会进行路由鉴权和注入路由
  utils               工具库，封装的基础请求api和工具函数
  .env                全局配置文件，项目的配置项全部在这里写，例如请求URL和标题
  .env.development    开发环境全局配置文件，相同项会覆盖 .env
  .env.production     生产环境全局配置文件，相同项会覆盖 .env
```
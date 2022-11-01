# vue_savage_admin



## 简介

一个中后台管理系统的基础框架，基于Vue3、、Typescript、和 Vue-cli@4.x，可作为项目基础模板进行开发。


## 依赖说明
- 引入Element-Plus组件库并配置了自动导入
- 使用 Pinia 状态管理器
- 使用 babel
- 使用 sass
- 使用 normalize.css

## 安装
```
git clone https://github.com/savage181855/vue-savage-admin.git
```
## 使用
```
yarn install
```

```
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

## 添加页面

项目的侧边栏菜单是根据路由记录来生成的，所以路由记录要遵循一定的规则，下面展示路有记录声明类型。

文件位于`src\router\routes\router.d.ts`

```typescript
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string;
    /** 用户角色 */
    roles?: string[];
    /** 是否在侧边栏不显示，默认为 false */
    isHidden?: boolean;
    /** 是否菜单路由， 默认为 true */
    isMenuRoute?: boolean;
    /** 是否缓存路由， 默认为 true */
    keepAlive?: boolean;
  }
}
```

`dashboard.ts`的配置，文件位于`src\router\routes\modules\dashboard.ts`


```typescript
import { RouteRecordRaw } from "vue-router";

export const dashboard: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "redirect",
    meta: {
      isMenuRoute: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/pages/dashboard/dashboard.vue"),
    meta: {
      title: "仪表盘",
      keepAlive: true,
    },
  },
];
```

只要`isMenuRoute`字段为`true`，路由处理就会自动包裹上`layout`组件，并且会作为侧边栏菜单进行显示和跳转。

`layout`组件位于`src\layout\index.vue`。
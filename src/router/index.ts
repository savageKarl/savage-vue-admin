import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { routes } from "./routes";
import { setupRouterGuard } from "./guard";
import { getCanInjectRoutes } from './utils'

// 路由分类：菜单路由，非菜单路由
// 菜单路由：可以通过菜单进行导航的页面，该页面跟菜单一起显示在视图；
// 非菜单路由：页面单独显示，不需要跟菜单一起使用，例如：注册和登录

export const router = createRouter({
  history: createWebHashHistory(),
  // 因为动态添加layout组件，首次路由跳转会警告报错，处理思路：首次使用所有添加layout的组件，保持打开的正常跳转，然后初始化路由的时候，清空路由，注入鉴权后的路由。
  routes: getCanInjectRoutes(routes),
});

setupRouterGuard(router);

export default function setupRouter(app: App): void {
  app.use(router);
}

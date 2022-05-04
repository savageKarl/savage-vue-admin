import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { routes } from "./routes";
import { setupRouterGuard } from "./guard";

// 路由分类：菜单路由，非菜单路由
// 菜单路由：可以通过菜单进行导航的页面，该页面跟菜单一起显示在视图；
// 非菜单路由：页面单独显示，不需要跟菜单一起使用，例如：注册和登录

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.onError((e, to, from ) => {
  console.debug(e, to, from)
})

setupRouterGuard(router);

export default function setupRouter(app: App): void {
  app.use(router);
}

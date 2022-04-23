import type { RouteRecordRaw } from "vue-router";
import { router } from "@/router";
import { routes } from "@/router/routes";
import { useMenuRouteStore } from "@/store/modules/MenuRoute";
import { useUserStore } from "@/store/modules/user";
// 在这里根据用户角色初始化路由
export function initRoutes() {
  const allRoutes = routes;
  const userStore = useUserStore();
  const accessibleRoutes = filterRoutesByRole(allRoutes, userStore.roles);

  const notHiddenMenuRoutes = getNotHiddenMenuRoutes(accessibleRoutes);

  const routeStore = useMenuRouteStore();
  routeStore.setMenuRoutes(notHiddenMenuRoutes);

  clearRoutes();
  injectRoutes(getCanInjectRoutes(accessibleRoutes));
}

/** 获取可注入的路由 */
export function getCanInjectRoutes(routes: RouteRecordRaw[]) {
  const menuRoutes = getMenuRoutes(routes);
  const falttendMenuRoutes = flattenMenuRoutes(menuRoutes);
  const layoutMenuRoutes = addLayoutToMenuRoute(falttendMenuRoutes);
  const notMenuRoutes = getNotMenuRoutes(routes);
  return [...notMenuRoutes, ...layoutMenuRoutes];
}

/** 获取菜单路由 */
export function getMenuRoutes(routes: RouteRecordRaw[]) {
  return routes.filter((item) => item.meta?.isMenuRoute ?? true);
}

/** 获取非菜单路由 */
export function getNotMenuRoutes(routes: RouteRecordRaw[]) {
  return routes.filter((item) => item.meta?.isMenuRoute === false);
}

/** 获取非隐藏菜单的菜单路由 */
export function getNotHiddenMenuRoutes(routes: RouteRecordRaw[]) {
  return routes.filter(
    (item) =>
      (item.meta?.isMenuRoute ?? true) && !(item.meta?.isHidden ?? false)
  );
}

/** 给菜单路由添加layout组件 */
export function addLayoutToMenuRoute(routes: RouteRecordRaw[]) {
  return routes.map((item, index) => {
    return {
      path: "/",
      name: `layout${index}`,
      component: () => import("@/layout/index.vue"),
      children: [item],
    } as RouteRecordRaw;
  });
}

/** 将嵌套路由处理成一维数组，扁平化菜单路由结构*/
export function flattenMenuRoutes(routes: RouteRecordRaw[]) {
  const flattendRoutes: RouteRecordRaw[] = [];
  routes.forEach((item) => {
    if (!item.children) flattendRoutes.push(item);
    else flattendRoutes.push(...flattenMenuRoutes(item.children));
  });
  return flattendRoutes;
}

/** 注入路由 */
export function injectRoutes(routes: RouteRecordRaw[]) {
  routes.forEach((item) => router.addRoute(item));
}

/** 清空路由 */
export function clearRoutes() {
  router.getRoutes().forEach((item) => router.removeRoute(item.name as any));
}

/** 根据用户权限过滤路由 */
export function filterRoutesByRole(routes: RouteRecordRaw[], roles: string[]) {
  const filteredRoutes: RouteRecordRaw[] = [];
  routes.forEach((item) => {
    // 路由没设置meta或者roles为空数组，表示该路由不做权限控制
    if (!item.meta || !item.meta.roles || item.meta.roles.length === 0) {
      filteredRoutes.push(item);
    } else {
      const status = roles?.some((role) => item.meta?.roles?.includes(role));
      if (status) {
        filteredRoutes.push(item);
        if (item.children)
          item.children = filterRoutesByRole(item.children, roles);
      }
    }
  });
  return filteredRoutes;
}

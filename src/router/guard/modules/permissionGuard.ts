import type { Router } from "vue-router";

import { useMenuRouteStore } from "@/store/modules/menuRoute";
import { useUserStore } from "@/store/modules/user";
import { initRoutes } from "@/router/utils";

export function setupPermissionGuard(router: Router) {
  router.beforeEach((to) => {
    const userStore = useUserStore();
    if (!userStore.token && to.name !== "login") {
      return "login";
    } else {
      const menuRouteStore = useMenuRouteStore();
      if (menuRouteStore.menuRoutes.length === 0) {
        initRoutes();
        return to.fullPath;
      }
      return true;
    }
  });
}

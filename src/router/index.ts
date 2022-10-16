import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { routes } from "./routes";
import { setupRouterGuard } from "./guard";



export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.onError((e, to, from ) => {
  console.error(e, to, from)
})

setupRouterGuard(router);

export default function setupRouter(app: App): void {
  app.use(router);
}

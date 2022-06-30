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
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "not-found",
  //   redirect: "/about",
  //   meta: {
  //     isMenuRoute: false,
  //   },
  // },
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

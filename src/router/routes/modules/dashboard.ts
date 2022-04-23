import { RouteRecordRaw } from "vue-router";

export const dashboard: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
    name: 'redirect',
    meta: {
      isMenuRoute: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/pages/dashboard/index.vue"),
    meta: {
      title: "仪表盘",
    },
  },
];

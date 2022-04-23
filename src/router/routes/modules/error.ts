import { RouteRecordRaw } from "vue-router";

export const error: RouteRecordRaw[] = [
  {
    path: "/error",
    redirect: "/error/401",
    meta: {
      title: "错误处理",
      roles: ["admin"],
    },
    children: [
      {
        path: "/error/401",
        name: "401",
        component: () => import("@/pages/errorPage/401/index.vue"),
        meta: {
          title: "401",
          roles: ["admin", "editor"],
        },
      },
      {
        path: "/error/403",
        name: "403",
        component: () => import("@/pages/errorPage/403/index.vue"),
        meta: {
          title: "403",
          roles: ["admin", "editor"],
        },
      },
    ],
  },
] 
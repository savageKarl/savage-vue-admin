import { RouteRecordRaw } from "vue-router";

export const error: RouteRecordRaw[] = [
  {
    path: "/error",
    redirect: "/error/401",
    name: "error",
    meta: {
      title: "错误处理",
      roles: ["admin"],
    },
    children: [
      {
        path: "/error/401",
        name: "401",
        component: () => import("@/pages/errorPage/401/401.vue"),
        meta: {
          title: "401",
          roles: ["admin", "editor"],
        },
      },
      {
        path: "/error/403",
        name: "403",
        component: () => import("@/pages/errorPage/403/403.vue"),
        meta: {
          title: "403",
          roles: ["admin", "editor"],
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/errorPage/404/404.vue"),
    meta: {
      isMenuRoute: false,
    },
  },
  {
    // 匹配找不到的路由，path 和 name不能改，改了会失效，
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/404",
    meta: {
      isMenuRoute: false,
    },
  },
];

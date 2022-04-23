import { RouteRecordRaw } from "vue-router";

export const login: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      title: "登录",
      isMenuRoute: false,
    },
  },
];

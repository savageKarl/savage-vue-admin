import { RouteRecordRaw } from "vue-router";

export const login: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/login.vue"),
    meta: {
      title: "登录",
      isMenuRoute: false,
    },
  },
];

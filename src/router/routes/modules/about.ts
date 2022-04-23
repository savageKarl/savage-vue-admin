import { RouteRecordRaw } from "vue-router";

export const about: RouteRecordRaw[] = [
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/about/index.vue"),
    meta: {
      title: "关于",
      roles: ["editor", 'admin'],
    },
  },
];

import { RouteRecordRaw } from "vue-router";

export const about: RouteRecordRaw[] = [
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/about/about.vue"),
    meta: {
      title: "关于",
      roles: ["editor", 'admin'],
    },
  },
];

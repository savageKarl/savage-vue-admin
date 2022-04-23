import { RouteRecordRaw } from "vue-router";

export const permission: RouteRecordRaw[] = [
  {
    path: "/permission",
    name: "permission",
    component: () => import("@/pages/permission/index.vue"),
    meta: {
      title: "权限控制",
    },
  },
];

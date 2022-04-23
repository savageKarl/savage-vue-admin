import { RouteRecordRaw } from "vue-router";

export const editor: RouteRecordRaw[] = [
  {
    path: "/editor",
    redirect: "/editor/markdown",
    meta: {
      title: "编辑器",
      roles: ["admin"],
    },
    children: [
      {
        path: "/editor/markdown",
        name: "markdown",
        component: () => import("@/pages/editor/markdown/index.vue"),
        meta: {
          title: "md编辑器",
        },
      },
      {
        path: "/editor/richText",
        name: "richText",
        component: () => import("@/pages/editor/richText/index.vue"),
        meta: {
          title: "富文本编辑器",
        },
      },
    ],
  },
];

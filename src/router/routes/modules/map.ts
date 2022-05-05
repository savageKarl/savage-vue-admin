import { RouteRecordRaw } from "vue-router";

export const map: RouteRecordRaw[] = [
  {
    path: '/map',
    name: 'map',
    redirect: '/map/baidu',
    meta: {
      title: '地图'
    },
    children: [
      {
        path: '/map/baidu',
        name: 'baidu',
        component: () => import("@/pages/map/baidu/index.vue"),
        meta: {
          title: '百度地图',
          keepAlive: true,
        }
      },
      {
        path: '/map/gaode',
        name: 'gaode',
        component: () => import("@/pages/map/gaode/index.vue"),
        meta: {
          title: '高德地图',
          keepAlive: true,
        }
      },
      {
        path: '/map/leaflet',
        name: 'leaflet',
        component: () => import("@/pages/map/leaflet/index.vue"),
        meta: {
          title: 'leaflet地图',
          keepAlive: true,
        }
      },
      {
        path: '/map/mapBox',
        name: 'mapBox',
        component: () => import("@/pages/map/mapBox/index.vue"),
        meta: {
          title: 'mapBox地图',
          keepAlive: true,
        }
      },
    ]

  }
]
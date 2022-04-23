import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';

export const useMenuRouteStore = defineStore('route', {
  state: ()=>({
    // 菜单路由记录，保持原有的嵌套结构，用于直接生成菜单。
    menuRoutes: [] as RouteRecordRaw[],
    
  }),
  actions: {
    setMenuRoutes(routes: RouteRecordRaw[]) {
      this.menuRoutes = routes;
    },
  },
})



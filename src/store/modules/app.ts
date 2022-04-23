import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () =>({
    isCollapseSideBar: false,
  }),
  actions: {
    toggleCollapseSidebar() {
      this.isCollapseSideBar = !this.isCollapseSideBar;
    }
  }
})


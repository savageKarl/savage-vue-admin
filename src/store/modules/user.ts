import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    roles: [] as string[],
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setRoles(roles: string[]) {
      this.roles = roles;
    },
  },
  persist: {
    enabled: true,
  },
});

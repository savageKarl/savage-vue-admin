import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    name: '',
    roles: [] as string[],
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setRoles(roles: string[]) {
      this.roles = roles;
    },
    setName(name: string) {
      this.name = name;
    }
  },
  persist: {
    enabled: true,
  },
});

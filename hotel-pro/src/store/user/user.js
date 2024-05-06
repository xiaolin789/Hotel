import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => {
    return {
      user_id: '',

      role: ''
    };
  },
  getters: {
    // 控制侧边栏展开
    getUserId(state) {
      return state.user_id;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    setUserId(user_id) {
      this.user_id = user_id;
      // console.log(user_id);
    },

    setRole(role) {
      this.role = role
    }
  },
  persist: {
    enabled: true,
    strategies: [
        { storage: localStorage, paths: [ 'user_id','role']}
    ]
}
});

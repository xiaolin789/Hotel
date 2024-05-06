import { defineStore } from "pinia";

export const collapseStore = defineStore('collapseStore',{
  state: () => {
    return {
        collapse: false
    }
  },
  getters: {
    // 控制侧边栏展开
    getCollapse(state) {
      return state.collapse;
    },
  },
  actions: {
    setCollapse(collapse) {
      this.collapse = collapse;
    },
  },
});

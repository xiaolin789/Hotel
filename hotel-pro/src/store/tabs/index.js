import { defineStore } from "pinia";

export const tabStore = defineStore("tabStore", {
  state: () => {
    return {
      tabList: [],
    };
  },
  getters: {
    getTabs(state) {
      return state.tabList;
    },
  },
  actions: {
    // 添加选项卡的数据
    addTab(tab) {
      // 判断是否已经添加了数据
      if (this.tabList.some((item) => item.path === tab.path)) return;
      this.tabList.push(tab);
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["tabList"] }],
  },
});

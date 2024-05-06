<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    @tab-click="clickBtn"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { tabStore } from "@/store/tabs";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";


// 获取当前路由
const route = useRoute();

// 路由跳转
const router = useRouter();

// 获取store
const store = tabStore();

// 获取选项卡数据
const tabList = computed(() => {
  return store.getTabs;
});

// 当前激活的选项卡
const activeTab = ref("");

// 设置当前激活的选项卡
const setActiveTab = () => {
  activeTab.value = route.path;
};

const removeTab = (targetName) => {
  // 首页不能关闭
  if (targetName === "/dashboard") return;
  const tabs = tabList.value;
  let activeName = activeTab.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.path;
        }
      }
    });
  }

  activeTab.value = activeName;
  // 设置新的选项卡数据
  store.tabList = tabs.filter((tab) => tab.path !== targetName);
  // 跳转路由
  router.push({ path: activeName })
};

// 添加选项卡
const addTab = () => {
  const { path, meta } = route;
  // 构造选项卡数据
  const tab = {
    title: meta.title,
    path: path,
  };
  // 添加到选项卡数据里面
  store.addTab(tab);
};

// 监听路由变化
watch(
  () => route.path,
  () => {
    // 设置激活的选项卡
    setActiveTab();

    // 添加选项卡
    addTab();
  }
);

// 选项卡点击事件
const clickBtn = (tab) => {
    const { props } = tab
    router.push({ path: props.name })
}

// 解决刷新浏览器选项卡数据丢失的问题
// const beforeRefresh = () => {
//     window.addEventListener('beforeunload',() => {
//         sessionStorage.setItem('tabsView',JSON.stringify(tabList.value))
//     })
//     let tabSession = sessionStorage.getItem('tabsView')
//     if(tabSession) {
//         let oldTabs = JSON.parse(tabSession)
//         if(oldTabs.length > 0) {
//             store.tabList = oldTabs
//         }
//     }
// }
onMounted(() => {
    // beforeRefresh()
    setActiveTab()
    addTab()
})
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
    margin: 0px;
}
:deep(.el-tabs__item) {
    height: 26px !important;
    line-height: 26px !important;
    text-align: center !important;
    border: 1px solid #d8dce5 !important;
    margin: 0px 3px !important;
    color: #495060;
    font-size: 12px !important;
    padding: 0px 10px !important;
}
:deep(.el-tabs__nav) {
    border: none !important;
}
:deep(.is-active) {
    border-bottom: 1px solid transparent !important;
    border: 1px solid #42b983 !important;
    background-color: #42b983 !important;
    color: #fff !important;
}
:deep(.el-tabs__item:hover) {
    color: #495060 !important;
}
:deep(.is-active:hover) {
    color: #fff !important;
}
:deep(.el-tabs__nav-next) {
    line-height: 26px !important;
}
:deep(.el-tabs__nav-prev) {
    line-height: 26px !important;
}
</style>
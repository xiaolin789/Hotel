<template>
  <el-breadcrumb separator="/" class="bread">
    <el-breadcrumb-item v-for="item in tabs" :key="item">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
// 获取当前路由
const route = useRoute();

// 定义面包屑数据
const tabs = ref([]);

// 监听路由变化的操作
const getBreadCrumb = () => {
  // 获取title不为空
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  // 判断第一个是否是首页，不是，构造一个首页
  const first = matched[0];
  if (first.path !== "/dashboard") {
    matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(matched);
  }
  // 设置面包屑数据
  tabs.value = matched;
};

// 解决数据刷新问题
getBreadCrumb()

// 监听当前路由的变化
watch(
  () => route.path,
  () => getBreadCrumb()
);
</script>

<style lang="scss" scoped>
:deep(.el-breadcrumb__inner) {
  color: #fff !important;
}
:deep(.el-breadcrumb__inner a) {
  color: #fff !important;
}
:deep(.el-breadcrumb__item) {
  font-size: 14px;
}
.bread {
  margin-left: 20px;
}
</style>
<template>
  <el-icon class="icons" :size="22" color="#FFF" @click="setCollapse">
    <!-- 图标显示：动态组件的方式显示 -->
    <component :is="status ? Fold : Expand"></component>
  </el-icon>
</template>

<script setup>
// import { createStore } from '@/store/collapse/index'
import { collapseStore } from '@/store/collapse/index';
import { Fold, Expand } from '@element-plus/icons-vue'
import { computed } from 'vue'
// 获取store
const store = collapseStore()
// 获取collapse
const status = computed(() => {
    return !store.getCollapse
})
// 图标切换事件
const setCollapse = () => {
    store.setCollapse(!store.collapse)
}
</script>

<style lang="scss" scoped>
.icons {
    cursor: pointer;
}
</style>
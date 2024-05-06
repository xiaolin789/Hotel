<template>
    <template v-for="menu in menuList" :key="menu.path">
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <el-icon>
            <!-- 图标显示：动态组件的方式显示 -->
            <component :is="menu.meta.icon"></component>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <!-- 递归调用：本质就是自己调用自己 循环下级菜单-->
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item style="color: #f4f4f5" v-else :index="menu.path">
      <el-icon>
        <component :is="menu.meta.icon"></component>
      </el-icon>
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
    </template>
</template>

<script setup>
//子组件接收父组件的值，菜单列表
defineProps(['menuList'])
</script>

<style lang="scss" scoped>

</style>
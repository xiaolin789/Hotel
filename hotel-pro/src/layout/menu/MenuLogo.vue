<template>
  <div class="logo">
    <img :src="MenuLogo" />
    <span v-if="!props.isCollapsed" class="logo-title">{{ title }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import MenuLogo from "@/assets/logo.jpg";

const title = ref("酒店管理系统");

// 接收父组件传递的参数
const props = defineProps({
  isCollapsed: {
    require: true,
    type: Boolean,
  },
});
// 解决标题僵硬的问题:延时
// const show = ref(true);
// watch(
//   () => props.isCollapsed,
//   (collapse) => {
//     if (!collapse) {
//       setTimeout(() => {
//         show.value = !collapse;
//       }, 300);
//     } else {
//       show.value = !collapse;
//     }
//   }
// );
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  cursor: pointer;
  align-items: center;
  img {
    width: 36px;
    height: 36px;
    margin-left: 20px;
    margin-right: 12px;
  }
  .logo-title {
    color: #fff;
    font-size: 22px;
    font-weight: 800;
    font-family: FangSong;
  }
}
</style>
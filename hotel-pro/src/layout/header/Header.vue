<template>
   <div class="header-left">
      <Collapse></Collapse>
   <BreadCrumb></BreadCrumb>
   </div>
   <LoginOut></LoginOut>
</template>

<script setup>
import Collapse from './Collapse.vue'
import BreadCrumb from './BreadCrumb.vue';
import LoginOut from './LoginOut.vue'
</script>

<style lang="scss" scoped>
.header-left {
   display: flex;
   align-items: center;
}
</style>
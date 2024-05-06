<template>
  <menu-logo :isCollapsed="isCollapse"></menu-logo>
  <el-menu
    :collapse="isCollapse"
    :collapse-transition="false"
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    unique-opened
    background-color="#304156"
    router
  >
  <menu-item v-if="store.$state.role == '0'" :menuList="menuList" ></menu-item>
    <menu-item v-else :menuList="menuList1"></menu-item>
    
  </el-menu>
</template>

<script setup>
import { reactive, computed } from "vue";
import MenuItem from "./MenuItem.vue";
import MenuLogo from "./MenuLogo.vue";
import { useRoute } from "vue-router";
import { collapseStore } from "@/store/collapse/index";
import { userStore } from "../../store/user/user";

const colstore = collapseStore();
const isCollapse = computed(() => {
  return colstore.getCollapse;
});

// 当前路由
const route = useRoute();

// 当前激活的菜单项
const activeIndex = computed(() => {
  const { path } = route;
  return path;
});

const store = userStore()



let menuList = reactive([
  {
    path: "/dashboard",
    component: "Layout",
    name: "dashboard",
    meta: {
      title: "首页",
      icon: "HomeFilled",
      roles: ["sys:dashboard"],
    },
  },
  {
    path: "/system",
    component: "Layout",
    name: "system",
    meta: {
      title: "系统管理",
      icon: "Setting",
      roles: ["sys:manage"],
    },
    children: [
      {
        path: "/userList",
        component: "/system/User/UserList",
        name: "userList",
        meta: {
          title: "员工管理",
          icon: "UserFilled",
          roles: ["sys:user"],
        },
      },
      {
        path: "/roleList",
        component: "/system/Role/RoleList",
        name: "roleList",
        meta: {
          title: "角色管理",
          icon: "Wallet",
          roles: ["sys:role"],
        },
      },
    ],
  },
  {
    path: "/totelRoot",
    component: "Layout",
    name: "totelRoot",
    meta: {
      title: "酒店管理",
      icon: "Setting",
      roles: ["sys:totelRoot"],
    },
    children: [
      {
        path: "/roomType",
        component: "/hotel/RoomType",
        name: "roomType",
        meta: {
          title: "房间类型",
          icon: "UserFilled",
          roles: ["sys:roomType"],
        },
      },
      {
        path: "/hotelService",
        component: "/hotel/HotelService",
        name: "hotelService",
        meta: {
          title: "服务管理",
          icon: "UserFilled",
          roles: ["sys:hotelService"],
        },
      },
      {
        path: "/hotelRoom",
        component: "/system/HotelRoom",
        name: "hotelRoom",
        meta: {
          title: "房间管理",
          icon: "Menu",
          roles: ["sys:hotelRoom"],
        },
      },
    ],
  },
  {
    path: "/activeRoot",
    component: "Layout",
    name: "activeRoot",
    meta: {
      title: "活动管理",
      icon: "UserFilled",
      roles: ["sys:activeRoot"],
    },
    children: [
      {
        path: "/banner",
        component: "/banner/Banner",
        name: "banner",
        meta: {
          title: "广告管理",
          icon: "UserFilled",
          roles: ["sys:banner"],
        },
      },
    ],
  },
  {
    path: "/FoodRoot",
    component: "Layout",
    name: "FoodRoot",
    meta: {
      title: "美食管理",
      icon: "Dish",
      roles: ["sys:FoodRoot"],
    },
    children: [
      {
        path: "/foodList",
        component: "/food/foodList",
        name: "food",
        meta: {
          title: "美食信息",
          icon: "KnifeFork",
          roles: ["sys:food"],
        },
      },
      {
        path: "/foodOrder",
        component: "/food/foodOrder",
        name: "food",
        meta: {
          title: "美食订单",
          icon: "UserFilled",
          roles: ["sys:foodorder"],
        },
      }
    ],
  },
  {
    path: "/OrderRoot",
    component: "Layout",
    name: "OrderRoot",
    meta: {
      title: "订单管理",
      icon: "Menu",
      roles: ["sys:OrderRoot"],
    },
    children: [
      {
        path: "/bookOrder",
        component: "/order/Order",
        name: "bookOrder",
        meta: {
          title: "前台订单",
          icon: "Platform",
          roles: ["sys:bookOrder"],
        },
      },
      {
        path: "/uniOrder",
        component: "/order/uniOrder",
        name: "uniOrder",
        meta: {
          title: "uni订单",
          icon: "Iphone",
          roles: ["sys:uniOrder"],
        },
      },
    ],
  },
  {
    path: "/SuggestRoot",
    component: "Layout",
    name: "SuggestRoot",
    meta: {
      title: "反馈管理",
      icon: "UserFilled",
      roles: ["sys:SuggestRoot"],
    },
    children: [
      {
        path: "/suggest",
        component: "/suggest/Suggest",
        name: "suggest",
        meta: {
          title: "反馈列表",
          icon: "Collection",
          roles: ["sys:suggest"],
        },
      },
    ],
  },
]);

let menuList1 = reactive([
  {
    path: "/dashboard",
    component: "Layout",
    name: "dashboard",
    meta: {
      title: "首页",
      icon: "HomeFilled",
      roles: ["sys:dashboard"],
    },
  },
  {
    path: "/totelRoot",
    component: "Layout",
    name: "totelRoot",
    meta: {
      title: "酒店管理",
      icon: "Setting",
      roles: ["sys:totelRoot"],
    },
    children: [
      {
        path: "/roomType",
        component: "/hotel/RoomType",
        name: "roomType",
        meta: {
          title: "房间类型",
          icon: "UserFilled",
          roles: ["sys:roomType"],
        },
      },
      {
        path: "/hotelService",
        component: "/hotel/HotelService",
        name: "hotelService",
        meta: {
          title: "服务管理",
          icon: "UserFilled",
          roles: ["sys:hotelService"],
        },
      },
      {
        path: "/hotelRoom",
        component: "/system/HotelRoom",
        name: "hotelRoom",
        meta: {
          title: "房间管理",
          icon: "Menu",
          roles: ["sys:hotelRoom"],
        },
      },
    ],
  },
  {
    path: "/activeRoot",
    component: "Layout",
    name: "activeRoot",
    meta: {
      title: "活动管理",
      icon: "UserFilled",
      roles: ["sys:activeRoot"],
    },
    children: [
      {
        path: "/banner",
        component: "/banner/Banner",
        name: "banner",
        meta: {
          title: "广告管理",
          icon: "UserFilled",
          roles: ["sys:banner"],
        },
      },
    ],
  },
  {
    path: "/OrderRoot",
    component: "Layout",
    name: "OrderRoot",
    meta: {
      title: "订单管理",
      icon: "Menu",
      roles: ["sys:OrderRoot"],
    },
    children: [
      {
        path: "/bookOrder",
        component: "/order/Order",
        name: "bookOrder",
        meta: {
          title: "前台订单",
          icon: "Platform",
          roles: ["sys:bookOrder"],
        },
      },
      {
        path: "/uniOrder",
        component: "/order/uniOrder",
        name: "uniOrder",
        meta: {
          title: "uni订单",
          icon: "Iphone",
          roles: ["sys:uniOrder"],
        },
      },
    ],
  },
  {
    path: "/SuggestRoot",
    component: "Layout",
    name: "SuggestRoot",
    meta: {
      title: "反馈管理",
      icon: "UserFilled",
      roles: ["sys:SuggestRoot"],
    },
    children: [
      {
        path: "/suggest",
        component: "/suggest/Suggest",
        name: "suggest",
        meta: {
          title: "反馈列表",
          icon: "Collection",
          roles: ["sys:suggest"],
        },
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
}
:deep(.el-menu .el-menu-item) {
  color: #bfcbd9;
}
// 菜单点中文字的颜色

:deep(.el-menu-item.is-active) {
  color: #409eff !important;
}
// 当前打开菜单的所有子菜单颜色

:deep(.is-opened .el-menu-item) {
  background-color: #1f2d3d !important;
}
// 鼠标移动菜单的颜色

:deep(.el-menu-item:hover) {
  background-color: #001528 !important;
}
</style>

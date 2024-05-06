import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/Index.vue";

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/Login.vue"),
    name: "login",
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("@/layout/dashboard/Index.vue"),
        name: "dashboard",
        meta: {
          title: "首页",
          icon: "#icondashboard",
        },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    name: "system",
    meta: {
      title: "系统管理",
      icon: "el-icon-menu",
      roles: ["sys:manage"],
    },
    children: [
      {
        path: "/userList",
        component: () => import("@/views/system/user/UserList.vue"),
        name: "UserList",
        meta: {
          title: "员工管理",
          icon: "el-icon-custom",
          roles: ["sys:user"],
        },
      },
      {
        path: "/roleList",
        component: () => import("@/views/system/role/RoleList.vue"),
        name: "roleList",
        meta: {
          title: "角色管理",
          icon: "el-icon-tools",
          roles: ["sys:role"],
        },
      },

    ],
  },
  {
    path: "/totelRoot",
    component: Layout,
    name: "totelRoot",
    meta: {
      title: "酒店管理",
      icon: "Settiong",
      roles: ["sys:totelRoot"],
    },
    children: [
      {
        path: "/roomType",
        component: () => import("@/views/hotel/Type/RoomType.vue"),
        meta: {
          title: "房间类型",
          icon: "UserFilled",
          roles: ["sys:roomType"],
        },
      },
      {
        path: "/hotelService",
        component: () => import("@/views/hotel/Service/HotelService.vue"),
        name: "hotelService",
        meta: {
          title: "服务管理",
          icon: "UserFilled",
          roles: ["sys:hotelService"],
        },
      },
      {
        path: "/hotelRoom",
        component: () => import("@/views/hotel/Room/HotelRoom.vue"),
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
    component: Layout,
    name: "activeRoot",
    meta: {
      title: "活动管理",
      icon: "UserFilled",
      roles: ["sys:activeRoot"],
    },
    children: [
      {
        path: "/banner",
        component: () => import("@/views/banner/Banner.vue"),
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
    path: "/foodRoot",
    component: Layout,
    name: "foodRoot",
    meta: {
      title: "美食管理",
      icon: "Dish",
      roles: ["sys:foodRoot"],
    },
    children: [
      {
        path: "/foodList",
        component: () => import("@/views/food/FoodList.vue"),
        name: "foodList",
        meta: {
          title: "美食信息",
          icon: "KnifeFork",
          roles: ["sys:food"],
        },
      },
      {
        path: "/foodOrder",
        component: () => import("@/views/food/FoodOrder.vue"),
        name: "foodOrder",
        meta: {
          title: "美食订单",
          icon: "KnifeFork",
          roles: ["sys:foodorder"],
        },
      },
    ],
  },
  {
    path: "/OrderRoot",
    component: Layout,
    name: "OrderRoot",
    meta: {
      title: "订单管理",
      icon: "Menu",
      roles: ["sys:OrderRoot"],
    },
    children: [
      {
        path: "/bookOrder",
        component: () => import("@/views/order/Order.vue"),
        name: "bookOrder",
        meta: {
          title: "前台订单",
          icon: "Platform",
          roles: ["sys:bookOrder"],
        },
      },
      {
        path: "/uniOrder",
        component: () => import("@/views/order/uniOrder.vue"),
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
    component: Layout,
    name: "SuggestRoot",
    meta: {
      title: "反馈管理",
      icon: "UserFilled",
      roles: ["sys:OrderRoot"],
    },
    children: [
      {
        path: "/suggest",
        component: () => import("@/views/suggest/Suggest.vue"),
        name: "suggest",
        meta: {
          title: "反馈列表",
          icon: "Collection",
          roles: ["sys:suggest"],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    // 如果授权(已经登录过了) next()
    // 未授权，重定向到login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  }
});

export default router;

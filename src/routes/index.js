import { createRouter, createWebHashHistory } from "vue-router";
import { user } from "../_helper";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Auth",
    component: () => import("../pages/Auth.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tasks/:type",
    name: "Tasks",
    component: () => import("../pages/Tasks.vue"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // otherwise redirect to home
  { path: "/.*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if ((to.meta.requiresAuth && user.id === null) || user.id === "undefined") {
    router.push("/login");
  } else if (user && user.id && to.path === "/login") {
    router.push("/");
  }
});

export default router;

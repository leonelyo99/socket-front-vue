import { createRouter, createWebHashHistory } from "vue-router";
import authRouter from "../modules/auth/router";
import pageRouter from "../modules/page/router";

const routes = [
  {
    path: "/",
    redirect: "/auth/login",
  },
  {
    path: "/auth",
    ...authRouter,
  },
  {
    path: "/page",
    ...pageRouter,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(
        /* webpackChunkName: "NoPageFound" */ "@/shared/views/PageNotFound"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
